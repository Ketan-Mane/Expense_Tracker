import { Button } from "../ui/button";
import { Calendar, Download, Settings } from "lucide-react";

const Header = () => {
	return (
		<header className="border-b bg-card">
			<div className="container mx-auto px-4 py-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">Expense Tracker</h1>
						<p className="text-muted-foreground">Manage your finances with ease</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							<Calendar className="h-4 w-4 mr-2" />
							This Month
						</Button>
						<Button variant="outline" size="sm">
							<Download className="h-4 w-4 mr-2" />
							Export
						</Button>
						<Button variant="outline" size="sm">
							<Settings className="h-4 w-4 mr-2" />
							Settings
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
