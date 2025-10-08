import z from "zod";

export const zodDate = z.preprocess((value) => {
	if (typeof value === "string" || value instanceof Date) {
		const date = new Date(value);
		if (!isNaN(date.getTime())) return date;
	}
	return undefined;
}, z.date());
