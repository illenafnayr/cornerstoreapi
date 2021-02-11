'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }
    toJSON(){
      return { ...this.get(), id: undefined, userId: undefined, createdAt: undefined, updatedAt: undefined }
    }
  };
  Address.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'street field must be provided'
        },
        notEmpty: {
          msg: 'street field must not be empty'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'city field must be provided'
        },
        notEmpty: {
          msg: 'city field must not be empty'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'state field must be provided'
        },
        notEmpty: {
          msg: 'state field must not be empty'
        }
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'zipcode field must be provided'
        },
        notEmpty: {
          msg: 'zipcode field must not be empty'
        }
      }
    },
    isShipping: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'shipping field must be provided'
        },
        notEmpty: {
          msg: 'shipping field must not be empty'
        }
      }
    },
    isBilling: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'billing field must be provided'
        },
        notEmpty: {
          msg: 'billing field must not be empty'
        }
      }
    }
  }, {
    sequelize,
    tableName: "addresses",
    modelName: 'Address',
  });
  return Address;
};