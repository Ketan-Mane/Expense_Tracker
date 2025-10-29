import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';
import { Pie, PieChart, Cell, Legend } from 'recharts';
import useCategoryAnalytics from '../hooks/use-category-analytics';
import slugify from 'slugify';
import { useMemo, useState } from 'react';
import { format, parseISO, subMonths } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

interface ChartData {
	name: string;
	value: number;
	fill: string;
}

export function SpendingChart() {
	const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
	const monthOptions = useMemo(() => {
		return Array.from({ length: 6 }, (_, i) => format(subMonths(new Date(), i), 'yyyy-MM'));
	}, []);

	const { data } = useCategoryAnalytics(selectedMonth);

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
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="space-y-1">
					<CardTitle>Spending by Category</CardTitle>
					<CardDescription>Select a month to view expense breakdown</CardDescription>
				</div>

				<Select value={selectedMonth} onValueChange={setSelectedMonth}>
					<SelectTrigger className="w-[160px]">
						<SelectValue placeholder="Select month" />
					</SelectTrigger>
					<SelectContent>
						{monthOptions.map((month) => (
							<SelectItem key={month} value={month}>
								{format(parseISO(month + '-01'), 'MMMM yyyy')}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				{data?.length === 0 ? (
					<p className="text-center text-sm text-muted-foreground">No data available</p>
				) : (
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
				)}
			</CardContent>
		</Card>
	);
}
