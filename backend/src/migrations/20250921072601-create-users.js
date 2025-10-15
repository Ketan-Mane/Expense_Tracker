"use strict";

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false, unique: true },
			password: { type: DataTypes.STRING, allowNull: true },
			createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
			updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
