import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../services/transactionService";

const useCreateTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
	});
};
export default useCreateTransaction;
