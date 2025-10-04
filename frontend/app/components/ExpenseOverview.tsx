import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingDown, TrendingUp, Wallet, DollarSign } from "lucide-react";

interface OverviewCardProps {
	title: string;
	amount: string;
	change: string;
	trend: "up" | "down";
	icon: React.ReactNode;
}

function OverviewCard({ title, amount, change, trend, icon }: OverviewCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{amount}</div>
				<p className="text-xs text-muted-foreground flex items-center">
					{trend === "up" ? (
						<TrendingUp className="h-4 w-4 mr-1 text-green-600" />
					) : (
						<TrendingDown className="h-4 w-4 mr-1 text-red-600" />
					)}
					{change} from last month
				</p>
			</CardContent>
		</Card>
	);
}

export function ExpenseOverview() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<OverviewCard
				title="Total Balance"
				amount="$12,456"
				change="+5.2%"
				trend="up"
				icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
			/>
			<OverviewCard
				title="Monthly Income"
				amount="$8,230"
				change="+12.1%"
				trend="up"
				icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
			/>
			<OverviewCard
				title="Monthly Expenses"
				amount="$3,774"
				change="-8.3%"
				trend="down"
				icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
			/>
			<OverviewCard
				title="Savings"
				amount="$4,456"
				change="+23.8%"
				trend="up"
				icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
			/>
		</div>
	);
}
