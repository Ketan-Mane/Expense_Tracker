import Category, { CategoryAttributes, CategoryCreationAttributes } from "@models/category.model";
import { Op } from "sequelize";
import PaginatedResult from "types/pagination";

const getCategories = async ({
	userId,
	page = 1,
	limit = 10,
}: {
	userId: string;
	page?: number;
	limit?: number;
}): Promise<PaginatedResult<CategoryAttributes>> => {
	const { rows, count } = await Category.findAndCountAll({
		where: {
			[Op.or]: [{ userId }, { isDefault: true }],
		},
		limit,
		offset: (page - 1) * limit,
	});
	const metadata = { count: rows.length, page, limit, totalPages: Math.ceil(count / limit) };
	return { data: rows, metadata };
};

const createCategory = async (data: CategoryCreationAttributes) => {
	return Category.create(data);
};

const updateCategory = async (data: { id: string; name: string; userId: string, color?: string }) => {
	const category = await Category.findOne({ where: { id: data.id, userId: data.userId } });
	if (!category) {
		throw new Error("Category not found");
	}
	category.name = data.name;
	category.color = data.color;
	await category.save();
	return category;
};

const deleteCategory = async (data: { id: string; userId: string }) => {
	const category = await Category.findOne({ where: { id: data.id, userId: data.userId } });
	if (!category) {
		throw new Error("Category not found");
	}
	await category.destroy();
};

export default { getCategories, createCategory, updateCategory, deleteCategory };
