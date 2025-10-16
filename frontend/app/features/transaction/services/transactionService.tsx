import axiosInstance from '~/axios/axiosInstance';
import type { ApiResponse, ApiResponseWithMetaData } from '~/types/api-response';
import type { Transaction } from '../types/transaction';

export const fetchTransactions = async (limit = 50, page = 1) => {
	const { data } = await axiosInstance.get<ApiResponseWithMetaData<{ transactions: Transaction[] }>>(
		'/transactions',
		{
			params: {
				limit,
				page,
			},
		},
	);
	return data.data;
};

export const createTransaction = async (payload: Transaction) => {
	const { data } = await axiosInstance.post<ApiResponse<{ data: Transaction }>>('/transactions', payload);
	return data;
};

export const updateTransaction = async (payload: Transaction) => {
	const { data } = await axiosInstance.put<ApiResponse<{ data: Transaction }>>(
		`/transactions/${payload.id}`,
		payload,
	);
	return data;
};

export const deleteTransaction = async (id: string) => {
	const { data } = await axiosInstance.delete<ApiResponse<{ data: Transaction }>>(`/transactions/${id}`);
	return data;
};

export const getCategoryAnalytics = async () => {
	const { data } = await axiosInstance.get('/transactions/analytics/category');
	return data.data;
};

export const getMonthlyAnalytics = async () => {
	const { data } = await axiosInstance.get('/transactions/analytics/monthly');
	return data.data;
};
