import Category from "@models/category.model";
import Month from "@models/month.model";
import Transaction, { TransactionCreationAttributes } from "@models/transaction.model";
import dayjs from "dayjs";
import { col, fn, Op } from "sequelize";
import { type PaginatedResult } from "types/pagination";

const getTransactions = async ({
	monthId = null,
	page = 1,
	limit = 10,
	isArchived = false,
	userId,
}: {
	monthId?: string | null;
	page?: number;
	limit?: number;
	isArchived?: boolean;
	userId: string;
}): Promise<PaginatedResult<"transactions", Transaction>> => {
	const { count, rows } = await Transaction.findAndCountAll({
		where: {
			...(monthId && { monthId }),
			isArchived,
		},
		limit,
		attributes: { exclude: ["categoryId"] },
		include: [
			{ model: Category, as: "category", attributes: ["id", "name", "color"] },
			{
				model: Month,
				as: "months",
				attributes: ["id", "name"],
				where: {
					userId,
				},
			},
		],
		offset: (page - 1) * limit,
	});

	const metadata = { count: rows.length, page, limit, totalPages: Math.ceil(count / limit) };
	return { transactions: rows, metadata };
};

const createTransaction = async (data: TransactionCreationAttributes, userId: string): Promise<Transaction> => {
	let month = await Month.findOne({
		where: {
			userId,
			startDate: { [Op.lte]: data.date },
			endDate: { [Op.gte]: data.date },
		},
	});
	if (!month) {
		const startDate = dayjs(data.date).startOf("month").toDate();
		const endDate = dayjs(data.date).endOf("month").toDate();

		month = await Month.create({
			userId,
			name: `${dayjs(data.date).format("MMMM YYYY")}`,
			startDate,
			endDate,
		});
	}

	const transaction = await Transaction.create({
		...data,
		categoryId: data.categoryId,
		monthId: month.id,
		paymentMethod: "UPI",
	});
	return transaction;
};

const updateTransaction = async (id: string, updates: Partial<TransactionCreationAttributes>): Promise<Transaction> => {
	const transaction = await Transaction.findByPk(id);
	if (!transaction) {
		throw new Error("Transaction not found");
	}
	await transaction.update(updates);
	return transaction;
};

const deleteTransaction = async (id: string): Promise<void> => {
	const transaction = await Transaction.findByPk(id);
	if (!transaction) {
		throw new Error("Transaction not found");
	}
	await transaction.destroy();
};

const getAnalyticsChart = async () => {
	const month = await Month.findOne({
		where: {
			startDate: { [Op.lte]: new Date() },
			endDate: { [Op.gte]: new Date() },
		},
	});

	const data = await Transaction.findAll({
		attributes: ["categoryId", [fn("SUM", col("amount")), "totalSpent"]],
		include: [{ model: Category, as: "category", required: false, attributes: ["name", "color"] }],
		where: { type: "Expense", monthId: month?.id, categoryId: { [Op.ne]: null } as any },
		group: ["categoryId", "category.id", "category.name", "category.color"],
		raw: true,
	});

	const formattedData: { name: string; fill: string; value: number }[] = data.map((item: any) => {
		return {
			name: item?.["category.name"] || "",
			fill: item?.["category.color"],
			value: item.totalSpent,
		};
	});

	return formattedData;
};

export default { getTransactions, createTransaction, updateTransaction, deleteTransaction, getAnalyticsChart };
