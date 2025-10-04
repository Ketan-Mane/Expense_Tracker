import axiosInstance from "~/axios/axiosInstance";
import type { ApiResponseWithMetaData } from "~/types/api-response";
import type { Category } from "../types/category";

export const fetchtCategories = async () => {
	const { data } = await axiosInstance.get<ApiResponseWithMetaData<{ categories: Category[] }>>("/categories");
	return data.data;
};
