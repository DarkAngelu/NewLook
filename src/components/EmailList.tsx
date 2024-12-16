import React from "react";
import { Email } from "../types/email";
import "./EmailList.css";

interface EmailListProps {
	emails: Email[];
	selectedId?: string;
	onSelect: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({
	emails,
	selectedId,
	onSelect,
}) => {
	return (
		<div className="email-list">
			{emails.map((email) => (
				<div
					key={email.id}
					className={`email-item ${
						selectedId === email.id ? "selected" : ""
					} ${!email.read ? "unread" : "read"}`}
					onClick={() => onSelect(email)}
				>
					<div className="avatar">
						{email.from.name[0].toUpperCase()}
					</div>
					<div className="email-content">
						<div className="email-header">
							<span className="email-header from">
								From: <b>{email.from.email}</b>
							</span>
						</div>
						<div className="subject">
							Subject: <b>{email.subject}</b>
						</div>
						<div className="short-description">
							{email.short_description}
						</div>
						<div className="email-footer">
							<span className="date">
								{new Date(email.date).toLocaleString("en-GB", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
									hour12: true,
								})}
							</span>
							{email.favorite && (
								<span className="favorite-tag">Favorite</span>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default EmailList;
