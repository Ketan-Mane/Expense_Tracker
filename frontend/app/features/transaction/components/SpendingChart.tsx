import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';
import { Pie, PieChart, Cell, Legend } from 'recharts';
import useCategoryAnalytics from '../hooks/use-category-analytics';
import slugify from 'slugify';

interface ChartData {
	name: string;
	value: number;
	fill: string;
}

export function SpendingChart() {
	const { data } = useCategoryAnalytics();

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
				<ChartContainer config={chartConfig}>
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
							{data?.map((entry: ChartData, index: number) => (
								<Cell key={`cell-${index}`} fill={entry.fill} />
							))}
						</Pie>
						<Legend />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
