import Category from "@models/category.model";
import Month from "@models/month.model";
import Transaction, { TransactionCreationAttributes } from "@models/transaction.model";
import User from "@models/user.model";
import dayjs from "dayjs";
import { Op } from "sequelize";
import { type PaginatedResult } from "types/pagination";

const getTransactions = async ({
	monthId = null,
	page = 1,
	limit = 10,
}: {
	monthId?: string | null;
	page?: number;
	limit?: number;
}): Promise<PaginatedResult<"transactions", Transaction>> => {
	const { count, rows } = await Transaction.findAndCountAll({
		...(monthId ? { where: { monthId } } : {}),
		limit,
		attributes: { exclude: ["categoryId"] },
		include: [{ model: Category, as: "category", attributes: ["id", "name", "color"] }],
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
			archived: false,
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

export default { getTransactions, createTransaction, updateTransaction, deleteTransaction };
