import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { type ChartConfig, ChartContainer } from '~/components/ui/chart';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, BarChart, Bar, Cell, Tooltip } from 'recharts';
import useMonthlyAnalytics from '../hooks/use-monthly-analytics';

const chartConfig = {
	expenses: {
		label: 'Expenses',
		color: '#f54a00',
	},
} satisfies ChartConfig;

export function TrendChart() {
	const { data } = useMonthlyAnalytics();

	const monthlyAnalytics = data || [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Overall expenses for this year</CardTitle>
				<CardDescription>Monthly expenses comparison</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={monthlyAnalytics}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="Month" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="Expenses">
								{monthlyAnalytics?.map((entry: any) => (
									<Cell
										cursor="pointer"
										fill={entry.amount === 0 ? '#82ca9d' : '#f54a00'}
										key={`cell-${entry?.id}`}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
