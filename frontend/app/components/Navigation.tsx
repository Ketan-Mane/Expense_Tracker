import useTransactions from '~/features/transaction/hooks/use-transactions';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart3, Settings2, Home, Receipt } from 'lucide-react';
import clsx from 'clsx';

interface NavigationProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
	const { data } = useTransactions();
	const transactions = data?.transactions || [];

	return (
		<Tabs value={activeTab} onValueChange={onTabChange} className="w-full text-sm">
			<TabsList className={clsx('grid w-full', transactions.length ? 'grid-cols-4' : 'grid-cols-3')}>
				<TabsTrigger value="dashboard" className="flex items-center gap-2">
					<Home className="h-4 w-4" />
					<span className="max-sm:hidden">Dashboard</span>
				</TabsTrigger>
				<TabsTrigger value="transactions" className="flex items-center gap-2">
					<Receipt className="h-4 w-4" />
					<span className="max-sm:hidden">Transactions</span>
				</TabsTrigger>
				<TabsTrigger value="categories" className="flex items-center gap-2">
					<Settings2 className="h-4 w-4" />
					<span className="max-sm:hidden">Categories</span>
				</TabsTrigger>
				{transactions.length > 0 && (
					<TabsTrigger value="analytics" className="flex items-center gap-2">
						<BarChart3 className="h-4 w-4" />
						<span className="max-sm:hidden">Analytics</span>
					</TabsTrigger>
				)}
			</TabsList>
		</Tabs>
	);
}
