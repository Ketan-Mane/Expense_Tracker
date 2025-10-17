import axiosInstance from '~/axios/axiosInstance';
import type { ApiResponse, ApiResponseWithMetaData } from '~/types/api-response';
import type { Category } from '../types/category';

export const fetchtCategories = async () => {
	const { data } = await axiosInstance.get<ApiResponseWithMetaData<'categories', Category>>('/categories');
	return data.data;
};

export const getCategory = async (id: string) => {
	const { data } = await axiosInstance.get<ApiResponse<{ data: Category }>>(`/categories/${id}`);
	return data.data;
};

export const createCategory = async (payload: Category) => {
	const { data } = await axiosInstance.post<ApiResponse<{ data: Category }>>('/categories', payload);
	return data.data;
};

export const updateCategory = async ({ id, payload }: { id: string; payload: Category }) => {
	const { data } = await axiosInstance.put<ApiResponse<{ data: Category }>>(`/categories/${id}`, payload);
	return data.data;
};

export const deleteCategory = async (id: string) => {
	const { data } = await axiosInstance.delete<ApiResponse<{ data: Category }>>(`/categories/${id}`);
	return data.data;
};
