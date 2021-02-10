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
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'company field must be provided'
        },
        notEmpty: {
          msg: 'company field must not be empty'
        }
      }
    },
    number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'cc number field must be provided'
        },
        notEmpty: {
          msg: 'cc number field must not be empty'
        },
        isCreditCard: {
          msg: 'must be a valid credit card number'
        }
      }
    },
    expMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'expiration month field must be provided'
        },
        notEmpty: {
          msg: 'expiration month field must not be empty'
        }
      }
    },
    expYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'expiration year field must be provided'
        },
        notEmpty: {
          msg: 'expiration year field must not be empty'
        }
      }
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'cvv field must be provided'
        },
        notEmpty: {
          msg: 'cvv field must not be empty'
        }
      }
    },
    primary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'field must be provided'
        },
        notEmpty: {
          msg: 'field must not be empty'
        }
      }
    }
  }, 
  {
    sequelize,
    tableName: 'payments',
    modelName: 'Payment'
  });
  return Payment;
};