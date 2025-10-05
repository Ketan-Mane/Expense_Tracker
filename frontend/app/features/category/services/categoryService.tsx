import axiosInstance from "~/axios/axiosInstance";
import type { ApiResponse, ApiResponseWithMetaData } from "~/types/api-response";
import type { Category } from "../types/category";

export const fetchtCategories = async () => {
	const { data } = await axiosInstance.get<ApiResponseWithMetaData<{ data: Category[] }>>("/categories");
	return data.data;
};

export const createCategory = async (payload: Category) => {
	const { data } = await axiosInstance.post<ApiResponse<{ data: Category }>>("/categories", payload);
	return data.data;
};
