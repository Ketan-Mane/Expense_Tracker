import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

const categoryData = [
	{
		name: "Food & Dining",
		amount: 1250,
		budget: 1500,
		color: "bg-chart-1",
	},
	{
		name: "Transportation",
		amount: 650,
		budget: 800,
		color: "bg-chart-2",
	},
	{
		name: "Shopping",
		amount: 890,
		budget: 1000,
		color: "bg-chart-3",
	},
	{
		name: "Entertainment",
		amount: 450,
		budget: 600,
		color: "bg-chart-4",
	},
	{
		name: "Bills & Utilities",
		amount: 320,
		budget: 400,
		color: "bg-chart-5",
	},
];

function formatCurrency(amount: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
}

export function CategoryBreakdown() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Budget vs Spending</CardTitle>
				<CardDescription>Track your spending against your budget by category</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{categoryData.map((category) => {
					const percentage = (category.amount / category.budget) * 100;
					const isOverBudget = percentage > 100;

					return (
						<div key={category.name} className="space-y-2">
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium">{category.name}</span>
								<span className="text-sm text-muted-foreground">
									{formatCurrency(category.amount)} / {formatCurrency(category.budget)}
								</span>
							</div>
							<Progress value={Math.min(percentage, 100)} className="h-2" />
							<div className="flex justify-between items-center">
								<span className={`text-xs ${isOverBudget ? "text-red-600" : "text-muted-foreground"}`}>
									{percentage.toFixed(1)}% used
								</span>
								{isOverBudget && (
									<span className="text-xs text-red-600">
										{formatCurrency(category.amount - category.budget)} over budget
									</span>
								)}
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
