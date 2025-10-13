import { useQuery } from '@tanstack/react-query';
import { getCategoryAnalytics } from '../services/transactionService';

const useCategoryAnalytics = () => {
	return useQuery({
		queryKey: ['chart-data'],
		queryFn: getCategoryAnalytics,
	});
};
export default useCategoryAnalytics;
