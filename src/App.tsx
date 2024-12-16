import { useState, useEffect } from "react";
import { Email, FilterType } from "./types/email";
import { getEmails } from "./api/emailApi";
import EmailList from "./components/EmailList";
import EmailDetail from "./components/EmailDetail";
import EmailFilters from "./components/EmailFilters";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
	const [emails, setEmails] = useState<Email[]>([]);
	const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
	const [filter, setFilter] = useState<FilterType>("all");
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		fetchEmails(currentPage);
	}, [currentPage]);

	async function fetchEmails(page: number) {
		setLoading(true);
		try {
			const fetchedEmails = await getEmails(page);
			const storedStates = JSON.parse(
				localStorage.getItem("emailStates") || "{}"
			);
			const emailsWithState = fetchedEmails.map((email: Email) => ({
				...email,
				read: storedStates[email.id]?.read || false,
				favorite: storedStates[email.id]?.favorite || false,
			}));
			setEmails(emailsWithState);
		} catch (error) {
			console.error("Failed to fetch emails:", error);
		}
		setLoading(false);
	}

	const handleEmailSelect = (email: Email) => {
		setSelectedEmail(email);
		if (!email.read) {
			const updatedEmails = emails.map((e) =>
				e.id === email.id ? { ...e, read: true } : e
			);
			setEmails(updatedEmails);
			updateLocalStorage(email.id, { read: true });
		}
	};

	const handleFavorite = (id: string) => {
		const updatedEmails = emails.map((email) =>
			email.id === id ? { ...email, favorite: !email.favorite } : email
		);
		setEmails(updatedEmails);
		const email = updatedEmails.find((e) => e.id === id);
		if (email) {
			updateLocalStorage(id, { favorite: email.favorite });
		}
	};

	const updateLocalStorage = (
		id: string,
		state: { read?: boolean; favorite?: boolean }
	) => {
		const storedStates = JSON.parse(
			localStorage.getItem("emailStates") || "{}"
		);
		localStorage.setItem(
			"emailStates",
			JSON.stringify({
				...storedStates,
				[id]: { ...storedStates[id], ...state },
			})
		);
	};

	const filteredEmails = emails.filter((email) => {
		switch (filter) {
			case "unread":
				return !email.read;
			case "read":
				return email.read;
			case "favorites":
				return email.favorite;
			default:
				return true;
		}
	});

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
        setSelectedEmail(null);
	};

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="app">
			<EmailFilters currentFilter={filter} onFilterChange={setFilter} />
			<div className="email-container">
				<div className="email-list-container">
					<EmailList
						emails={filteredEmails}
						selectedId={selectedEmail?.id}
						onSelect={handleEmailSelect}
					/>
					<div className="pagination-wrapper">
						<Pagination
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
				{selectedEmail && (
					<div className="email-detail">
						<EmailDetail
							email={selectedEmail}
							onFavorite={handleFavorite}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
