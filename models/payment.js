'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // userId
      this.belongsTo(User, { foreignKey: 'userId' })
    }
    toJSON(){
      return { ...this.get(), id: undefined, userId: undefined }
    }
  };
  Payment.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.INTEGER,
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
    }
  }, 
  {
    sequelize,
    tableName: 'payments',
    modelName: 'Payment'
  });
  return Payment;
};