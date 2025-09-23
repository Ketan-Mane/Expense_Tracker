export default interface PaginatedResult<T> {
	data: T[];
	metadata: {
		count: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}
