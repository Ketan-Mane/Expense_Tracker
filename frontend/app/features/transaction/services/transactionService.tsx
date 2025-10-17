import axiosInstance from '~/axios/axiosInstance';
import type { ApiResponse, ApiResponseWithMetaData } from '~/types/api-response';
import type { Filters, Transaction } from '../types/transaction';

export const fetchTransactions = async (params: Filters) => {
	const { data } = await axiosInstance.get<ApiResponseWithMetaData<'transactions', Transaction>>('/transactions', {
		params,
	});
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
