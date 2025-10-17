import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart3, Settings2, Home, Receipt } from 'lucide-react';

interface NavigationProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
	return (
		<Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger value="dashboard" className="flex items-center gap-2">
					<Home className="h-4 w-4" />
					Dashboard
				</TabsTrigger>
				<TabsTrigger value="transactions" className="flex items-center gap-2">
					<Receipt className="h-4 w-4" />
					Transactions
				</TabsTrigger>
				<TabsTrigger value="categories" className="flex items-center gap-2">
					<Settings2 className="h-4 w-4" />
					Categories
				</TabsTrigger>
				<TabsTrigger value="analytics" className="flex items-center gap-2">
					<BarChart3 className="h-4 w-4" />
					Analytics
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
