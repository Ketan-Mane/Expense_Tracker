import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '../services/transactionService';

const useDeleteTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recent-transactions'] });
			queryClient.invalidateQueries({ queryKey: ['chart-data'] });
		},
	});
};
export default useDeleteTransaction;
