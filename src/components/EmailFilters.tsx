import React from "react";
import { FilterType } from "../types/email";
import "./EmailFilters.css";

interface EmailFiltersProps {
	currentFilter: FilterType;
	onFilterChange: (filter: FilterType) => void;
}

const EmailFilters: React.FC<EmailFiltersProps> = ({
	currentFilter,
	onFilterChange,
}) => {
	return (
		<div className="email-filters">
			<button
				className={currentFilter === "all" ? "active" : ""}
				onClick={() => onFilterChange("all")}
			>
				All
			</button>
			<button
				className={currentFilter === "unread" ? "active" : ""}
				onClick={() => onFilterChange("unread")}
			>
				Unread
			</button>
			<button
				className={currentFilter === "read" ? "active" : ""}
				onClick={() => onFilterChange("read")}
			>
				Read
			</button>
			<button
				className={currentFilter === "favorites" ? "active" : ""}
				onClick={() => onFilterChange("favorites")}
			>
				Favorites
			</button>
		</div>
	);
};

export default EmailFilters;
