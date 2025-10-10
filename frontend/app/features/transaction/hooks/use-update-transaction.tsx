import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTransaction } from '../services/transactionService';

const useUpdateTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transactions'] });
			queryClient.invalidateQueries({ queryKey: ['chart-data'] });
		},
	});
};
export default useUpdateTransaction;
