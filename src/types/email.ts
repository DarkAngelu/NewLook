export interface Email {
	id: string;
	from: {
		email: string;
		name: string;
	};
	subject: string;
	short_description: string;
	date: number;
	read?: boolean;
	favorite?: boolean;
}

export interface EmailBody {
	id: string;
	body: string;
}

export type FilterType = "unread" | "read" | "favorites" | "all";
