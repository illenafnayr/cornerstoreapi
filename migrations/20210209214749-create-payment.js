'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ccCompany: {
        type: DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      expMonth: {
        type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false
      },
      expYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cvv: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      primary: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('payments');
  }
};