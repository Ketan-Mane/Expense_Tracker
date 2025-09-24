"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Categories", {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: { model: "Users", key: "id" },
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			color: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			icon: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
			updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Categories");
	},
};
