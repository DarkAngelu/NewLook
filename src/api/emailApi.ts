import { Email, EmailBody } from "../types/email";

export async function getEmails(page: number = 1): Promise<Email[]> {
	const response = await fetch(
		`https://flipkart-email-mock.now.sh/?page=${page}`
	);
	const data = await response.json();
	return data.list;
}

export async function getEmailBody(id: string): Promise<EmailBody> {
	const response = await fetch(
		`https://flipkart-email-mock.now.sh/?id=${id}`
	);
	return await response.json();
}
