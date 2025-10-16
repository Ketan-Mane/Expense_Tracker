import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../services/transactionService';

const useTransactions = ({ limit = 50, page = 1 }: { limit?: number; page?: number } = {}) => {
	return useQuery({
		queryKey: ['recent-transactions', limit, page],
		queryFn: ({ queryKey: [, limit, page] }: any) => fetchTransactions(limit, page),
	});
};
export default useTransactions;
