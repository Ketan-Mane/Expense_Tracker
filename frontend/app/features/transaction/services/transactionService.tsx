import axiosInstance from "~/axios/axiosInstance";

export const fetchTransactions = async () => {
	const response = await axiosInstance.get("/transactions");
	return response.data;
};
