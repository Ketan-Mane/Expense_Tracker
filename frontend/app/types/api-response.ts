import type { MetaData } from "~/schemas/metadata";

export type ApiResponse<T> = {
	statusCode: number;
	success: boolean;
	message: string;
	data?: T;
	errors?: any;
};

export type ApiResponseWithMetaData<K extends string, T> = ApiResponse<Record<K, T[]> & { metadata: MetaData }>;
