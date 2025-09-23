"use strict";

const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Months", {
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
				onUpdate: "CASCADE",
			},
			name: { type: DataTypes.STRING, allowNull: false },
			startDate: { type: DataTypes.DATEONLY, allowNull: false },
			endDate: { type: DataTypes.DATEONLY, allowNull: false },
			archived: { type: DataTypes.BOOLEAN, defaultValue: false },
			createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
			updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Months");
	},
};
