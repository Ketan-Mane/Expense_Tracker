import { useQuery } from '@tanstack/react-query';
import { getMonthlyAnalytics } from '../services/transactionService';

const useMonthlyAnalytics = () => {
	return useQuery({
		queryKey: ['monthly-analytics'],
		queryFn: getMonthlyAnalytics,
	});
};
export default useMonthlyAnalytics;
