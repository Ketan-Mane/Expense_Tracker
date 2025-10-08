import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../services/transactionService";

const useTransactions = () => {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: fetchTransactions,
	});
};
export default useTransactions;
