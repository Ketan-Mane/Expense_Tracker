import { useQuery } from '@tanstack/react-query';
import { getChartData } from '../services/transactionService';

const useFetchChartData = () => {
	return useQuery({
		queryKey: ['chart-data'],
		queryFn: getChartData,
	});
};
export default useFetchChartData;
