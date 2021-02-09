module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define('addresses', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zipcode: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isShipping: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        isBilling: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })
    Address.associate = (models) => {
        Address.belongsTo(models.users, {
            foreignKey: 'id', as: 'user_id'
        });
    }
    return Address;
}
