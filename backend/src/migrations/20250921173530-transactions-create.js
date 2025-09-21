"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Transactions", {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			item: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
			updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Transactions");
	},
};
