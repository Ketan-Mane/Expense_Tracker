export type PaginatedResult<K extends string, T> = {
	[P in K]: T[];
} & {
	metadata: {
		count: number;
		page: number;
		limit: number;
		totalPages: number;
	};
};
