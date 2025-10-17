import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../services/transactionService';
import type { fi } from 'date-fns/locale';
import type { Filters } from '../types/transaction';

const useTransactions = ({ ...filters }: Filters = {}) => {
	return useQuery({
		queryKey: ['transactions', filters],
		queryFn: () => fetchTransactions({ ...filters }),
	});
};
export default useTransactions;
