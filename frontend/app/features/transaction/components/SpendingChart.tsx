import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts';
import useFetchChartData from '../hooks/use-fetch-chart-data';
import slugify from 'slugify';

interface ChartData {
	name: string;
	value: number;
	fill: string;
}

const data = [
	{ name: 'Food & Dining', value: 1250, fill: 'var(--color-chart-1)' },
	{ name: 'Transportation', value: 650, fill: 'var(--color-chart-2)' },
	{ name: 'Shopping', value: 890, fill: 'var(--color-chart-3)' },
	{ name: 'Entertainment', value: 450, fill: 'var(--color-chart-4)' },
	{ name: 'Bills & Utilities', value: 320, fill: 'var(--color-chart-5)' },
	{ name: 'Healthcare', value: 204, fill: '#8B5CF6' },
];

export function SpendingChart() {
	const { data } = useFetchChartData();

	const chartConfig =
		(data?.length > 0 &&
			(data?.map((item: any) => {
				const key = slugify(item?.name || '', { lower: true });
				return {
					[key]: {
						label: item?.name,
						color: item?.fill,
					},
				};
			}) satisfies ChartConfig)) ||
		[];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Spending by Category</CardTitle>
				<CardDescription>This month's expense breakdown</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<Pie
								data={data}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={80}
								innerRadius={40}
							>
								{data.map((entry: ChartData, index: number) => (
									<Cell key={`cell-${index}`} fill={entry.fill} />
								))}
							</Pie>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
