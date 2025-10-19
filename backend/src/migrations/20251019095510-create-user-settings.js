"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("UserSettings", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				unique: true,
				references: { model: "Users", key: "id" },
				onDelete: "CASCADE",
			},
			defaultPaymentMethod: { type: Sequelize.STRING, allowNull: true },
			defaultCurrency: { type: Sequelize.STRING, allowNull: true },
			financialMonthStart: { type: Sequelize.INTEGER, allowNull: true },
			financialMonthEnd: { type: Sequelize.INTEGER, allowNull: true },
			weeklyStartDay: { type: Sequelize.ENUM("Sunday", "Monday"), allowNull: true },
			monthlyBudgetLimit: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
			budgetNotificationsEnabled: { type: Sequelize.BOOLEAN, defaultValue: true },
			transactionReminders: { type: Sequelize.BOOLEAN, defaultValue: true },
			favoriteCategories: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: true },
			defaultView: { type: Sequelize.ENUM("list", "calendar", "chart"), defaultValue: "list" },
			recurringTransactionFrequency: {
				type: Sequelize.ENUM("daily", "weekly", "monthly"),
				allowNull: true,
			},
			recurringTransactionDefaultCategory: { type: Sequelize.UUID, allowNull: true },
			createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
			updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("UserSettings");
	},
};
