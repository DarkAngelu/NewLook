import React, { useState, useEffect } from "react";
import { Email, EmailBody } from "../types/email";
import { getEmailBody } from "../api/emailApi";
import "./EmailDetail.css";

interface EmailDetailProps {
	email: Email;
	onFavorite: (id: string) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, onFavorite }) => {
	const [body, setBody] = useState<EmailBody | null>(null);
	const [loading, setLoading] = useState(true);
    const [favorited, setFavorited] = useState(email.favorite);

	useEffect(() => {
		async function fetchBody() {
			setLoading(true);
			try {
				const data = await getEmailBody(email.id);
				setBody(data);
			} catch (error) {
				console.error("Failed to fetch email body:", error);
			}
			setLoading(false);
            setFavorited(email.favorite);
		}

		fetchBody();
	}, [email.id]);

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	return (
        <>
			<div className="email-header">
				<h2>{email.subject}</h2>
				<button
					className={`favorite-button ${
						favorited ? "favorited" : ""
					}`}
					onClick={() => {
                        onFavorite(email.id);
                        setFavorited(!favorited);
                    }}
				>
					{favorited ? "Favorited" : "Mark as favorite"}
				</button>
			</div>
			<div className="email-info">
				<span>From: {email.from.email}</span>
				<span>
					Date:{" "}
					{new Date(email.date).toLocaleString("en-GB", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
                        hour12: true,
					})}
				</span>
			</div>
			<div
				className="email-body"
				dangerouslySetInnerHTML={{ __html: body?.body || "" }}
			/>
        </>
	);
};

export default EmailDetail;