import { SpendingChart } from '~/features/transaction/components/SpendingChart';
import { TrendChart } from '~/features/transaction/components/TrendChart';

const Analytics = () => {
	return (
		<div className="grid gap-6 lg:grid-cols-2">
			<SpendingChart />
			<TrendChart />
		</div>
	);
};
export default Analytics;
