'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      return { ...this.get(), id:undefined }
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, 
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    // timestamps: false
  });
  // User.associate = (models) => {
  //       //One to many with address
  //       User.hasMany(models.Address, {
  //           foreignKey: 'user_id'
  //       });
  //       //One to many with phoneNumber
  //       User.hasMany(models.PhoneNumber, {
  //           foreignKey: 'user_id'
  //       });
  //       //One to many with payment
  //       User.hasMany(models.Payment, {
  //           foreignKey: 'user_id'
  //       });
  //   }
  return User;
};