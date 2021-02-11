'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Product }) {
      // define association here
      this.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })
      this.belongsTo(Product, { foreignKey: 'productId' })
    }
    toJSON(){
      return { ...this.get(), id: undefined, orderId: undefined, productId: undefined, createdAt: undefined, updatedAt: undefined }
    }
  };
  OrderDetail.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'qty field must be provided'
        },
        notEmpty: {
          msg: 'qty field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    tableName: 'order_details',
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};