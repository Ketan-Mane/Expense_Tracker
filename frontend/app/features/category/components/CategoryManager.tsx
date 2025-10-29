import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Plus, Settings2 } from 'lucide-react';
import Modal from '~/components/common/modal';
import CategoryForm from '~/features/category/components/CategoryForm';
import ListCategory from '~/features/category/components/ListCategory';
import useFormatCurrency from '~/hooks/use-format-currency';

export function CategoryManager() {
	const totalBudget = 10000;
	const formatCurrency = useFormatCurrency();

	return (
		<Card>
			<CardHeader>
				<div className="flex max-md:flex-col gap-2 items-center justify-between">
					<div>
						<CardTitle className="flex items-center gap-2">
							<Settings2 className="h-5 w-5" />
							Category Management
						</CardTitle>
						<CardDescription>
							Manage your expense categories and budgets • Total Budget: {formatCurrency(totalBudget)}
						</CardDescription>
					</div>

					<Modal
						title="Add New Category"
						button={
							<Button className="self-end">
								<Plus />
								Add Category
							</Button>
						}
						render={(close) => <CategoryForm close={close} />}
					/>
				</div>
			</CardHeader>

			<CardContent>
				<ListCategory />
			</CardContent>
		</Card>
	);
}
