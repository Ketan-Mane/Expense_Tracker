import axiosInstance from '~/axios/axiosInstance';
import type { ApiResponse, ApiResponseWithMetaData } from '~/types/api-response';
import type { Transaction } from '../types/transaction';

export const fetchTransactions = async () => {
	const { data } = await axiosInstance.get<ApiResponseWithMetaData<{ transactions: Transaction[] }>>('/transactions');
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
