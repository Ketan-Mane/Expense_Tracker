import { useQuery } from '@tanstack/react-query';
import { getCategoryAnalytics } from '../services/transactionService';

const useCategoryAnalytics = (month: string) => {
	return useQuery({
		queryKey: ['chart-data', month],
		queryFn: () => getCategoryAnalytics({ month }),
		enabled: !!month, // only run when month is defined
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};

export default useCategoryAnalytics;
