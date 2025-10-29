import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Input } from '~/components/ui/input';
import { MoreHorizontal, Search, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import useTransactions from '../hooks/use-transactions';
import ListTransactions from './ListTransactions';
import useCategories from '~/features/category/hooks/use-categories';
import useDebounce from '~/hooks/use-debounce';


function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

// Generate month options
function getMonthOptions() {
	const months = [];
	const today = new Date(2025, 9, 17); // October 17, 2025

	for (let i = 0; i < 12; i++) {
		const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
		const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
		const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
		months.push({ value, label });
	}

	return months;
}

const AllTransactions = () => {
	const [selectedMonth, setSelectedMonth] = useState('2025-10');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const debouncedSearch = useDebounce(searchQuery, 500);
	const { data } = useTransactions({
		limit: itemsPerPage,
		page: currentPage,
		search: debouncedSearch,
		category: selectedCategory,
		month: selectedMonth,
	});
	const { data: categoriesData } = useCategories();
	const categories = categoriesData?.categories || [];
	const transactions = data?.transactions || [];
	const metadata = data?.metadata;
	const totalPages = metadata?.totalPages || 1;

	const monthOptions = getMonthOptions();

	// Reset to page 1 when filters change
	const handleMonthChange = (value: string) => {
		setSelectedMonth(value);
		setCurrentPage(1);
	};

	const handleCategoryChange = (value: string) => {
		setSelectedCategory(value);
		setCurrentPage(1);
	};

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	};

	const handleExport = () => {};

	return (
		<div className="space-y-6">
			{/* Summary Cards */}
			{/* <div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="pb-3">
						<CardDescription>Total Transactions</CardDescription>
						<CardTitle className="text-3xl">{filteredTransactions.length}</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="pb-3">
						<CardDescription>Total Income</CardDescription>
						<CardTitle className="text-3xl text-green-600">+{formatCurrency(totals.income)}</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="pb-3">
						<CardDescription>Total Expenses</CardDescription>
						<CardTitle className="text-3xl text-red-600">-{formatCurrency(totals.expenses)}</CardTitle>
					</CardHeader>
				</Card>
			</div> */}

			{/* Filters and Table */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>All Transactions</CardTitle>
							<CardDescription>View and filter all your transactions</CardDescription>
						</div>
						{/* <Button onClick={handleExport} variant="outline" size="sm">
							<Download className="h-4 w-4 mr-2" />
							Export
						</Button> */}
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Filter Controls */}
					<div className="flex flex-col gap-4 md:flex-row md:items-center">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search transactions..."
									value={searchQuery}
									onChange={(e) => handleSearchChange(e.target.value)}
									className="pl-9"
								/>
							</div>
						</div>

						<div className="flex gap-2">
							<Select value={selectedMonth} onValueChange={handleMonthChange}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select month" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Time</SelectItem>
									{monthOptions.map((month) => (
										<SelectItem key={month.value} value={month.value}>
											{month.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select value={selectedCategory} onValueChange={handleCategoryChange}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="All" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="All">All</SelectItem>
									{categories.map((category) => (
										<SelectItem key={category?.id} value={category?.id}>
											{category?.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Transactions Table */}
					<div className="rounded-md border">
						<ListTransactions transactions={transactions} />
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-between">
							<div className="text-sm text-muted-foreground">
								Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
								{Math.min(currentPage * itemsPerPage, transactions.length)} of {transactions.length}{' '}
								transactions
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									disabled={currentPage === 1}
								>
									<ChevronLeft className="h-4 w-4 mr-1" />
									Previous
								</Button>
								<div className="text-sm">
									Page {currentPage} of {totalPages}
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
								>
									Next
									<ChevronRight className="h-4 w-4 ml-1" />
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AllTransactions;
