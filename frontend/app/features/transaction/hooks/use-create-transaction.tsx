import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from '../services/transactionService';

const useCreateTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recent-transactions'] });
			queryClient.invalidateQueries({ queryKey: ['chart-data'] });
		},
	});
};
export default useCreateTransaction;
