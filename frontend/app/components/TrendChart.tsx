import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", income: 7500, expenses: 4200 },
  { month: "Feb", income: 8100, expenses: 3800 },
  { month: "Mar", income: 7800, expenses: 4100 },
  { month: "Apr", income: 8500, expenses: 3900 },
  { month: "May", income: 8200, expenses: 3600 },
  { month: "Jun", income: 8000, expenses: 4000 },
  { month: "Jul", income: 8300, expenses: 3700 },
  { month: "Aug", income: 8100, expenses: 3800 },
  { month: "Sep", income: 8400, expenses: 3500 },
  { month: "Oct", income: 8230, expenses: 3774 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--color-chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

export function TrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>Monthly trend comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                className="text-xs"
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                className="text-xs"
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="var(--color-chart-1)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-chart-1)" }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="var(--color-chart-2)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-chart-2)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}