import { useState } from "react";
import { type MetaArgs } from "react-router";
import { CategoryBreakdown } from "~/components/CategoryBreakdown";
import { CategoryManager } from "~/features/category/components/CategoryManager";
import { ExpenseOverview } from "~/components/ExpenseOverview";
import Header from "~/components/header/header";
import { Navigation } from "~/components/Navigation";
import { SpendingChart } from "~/components/SpendingChart";
import { TrendChart } from "~/components/TrendChart";
import { Toaster } from "~/components/ui/sonner";
import { RecentTransactions } from "~/features/transaction/components/RecentTransactions";
import AddTransactionCard from "~/features/transaction/components/AddTransactionCard";

export function meta({}: MetaArgs) {
	return [
		{ title: "Home - Expense Tracker" },
		{ name: "description", content: "Welcome to React Router! Hello React" },
	];
}

export default function Home() {
	const [activeTab, setActiveTab] = useState("dashboard");

	const renderDashboard = () => (
		<div className="space-y-8">
			{/* Overview Cards */}
			<ExpenseOverview />

			{/* Charts Section */}
			<div className="grid gap-6 lg:grid-cols-2">
				<SpendingChart />
				<TrendChart />
			</div>

			{/* Bottom Section */}
			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<RecentTransactions />
				</div>
				<div className="space-y-6">
					<AddTransactionCard />
					<CategoryBreakdown />
				</div>
			</div>
		</div>
	);

	const renderCategories = () => (
		<div className="space-y-8">
			<CategoryManager />
		</div>
	);

	const renderAnalytics = () => (
		<div className="space-y-8">
			<div className="grid gap-6 lg:grid-cols-2">
				<SpendingChart />
				<TrendChart />
			</div>
			<CategoryBreakdown />
		</div>
	);

	return (
		<>
			<div className="min-h-screen bg-background">
				<Toaster />
				<Header />

				{/* Navigation */}
				<div className="container mx-auto px-4 py-4">
					<Navigation activeTab={activeTab} onTabChange={setActiveTab} />
				</div>

				{/* Main Content */}
				<main className="container mx-auto px-4 pb-8">
					{activeTab === "dashboard" && renderDashboard()}
					{activeTab === "categories" && renderCategories()}
					{activeTab === "analytics" && renderAnalytics()}
				</main>
			</div>
		</>
	);
}
