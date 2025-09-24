"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Budgets", {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: { model: "Users", key: "id" },
				onDelete: "CASCADE",
			},
			monthId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: { model: "Months", key: "id" },
				onDelete: "CASCADE",
			},
			categoryId: {
				type: DataTypes.UUID,
				allowNull: true, // null = overall monthly budget
				references: { model: "Categories", key: "id" },
				onDelete: "CASCADE",
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: new Date(),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Budgets");
	},
};
