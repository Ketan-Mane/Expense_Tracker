export type ApiResponse<T> = {
	statusCode: number;
	success: boolean;
	message: string;
	data?: T;
	errors?: any;
};

export type MetaData = {
	count: number;
	page: number;
	limit: number;
	totalPages: number;
};

export type ApiResponseWithMetaData<K extends string, T> = ApiResponse<Record<K, T[]> & { metadata: MetaData }>;
