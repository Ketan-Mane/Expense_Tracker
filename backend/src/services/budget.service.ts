import Budget, { BudgetAttributes, BudgetCreationAttributes } from "@models/budget.model";
import PaginatedResult from "types/pagination";

const getBudgetsByUserId = async ({
	userId,
	page = 1,
	limit = 10,
}: {
	userId: string;
	page?: number;
	limit?: number;
}): Promise<PaginatedResult<BudgetAttributes>> => {
	const { rows, count } = await Budget.findAndCountAll({ where: { userId } });
	const metadata = { count: rows.length, page, limit, totalPages: Math.ceil(count / limit) };
	return { data: rows, metadata };
};

const createBudget = async (budgetData: BudgetCreationAttributes): Promise<BudgetAttributes> => {
	const budget = await Budget.create(budgetData);
	return budget;
};

const updateBudget = async (
	id: string,
	budgetData: Partial<BudgetCreationAttributes>
): Promise<BudgetAttributes | null> => {
	const budget = await Budget.findByPk(id);
	if (!budget) return null;
	await budget.update(budgetData);
	return budget;
};

const deleteBudget = async (id: string): Promise<boolean> => {
	const deletedCount = await Budget.destroy({ where: { id } });
	return deletedCount > 0;
};

export default { getBudgetsByUserId, createBudget, updateBudget, deleteBudget };
