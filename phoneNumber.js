module.exports = (sequelize, Sequelize) => {
    const PhoneNumber = sequelize.define('phone_numbers', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        country_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        area_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    PhoneNumber.associate = (models) => {
        PhoneNumber.belongsTo(models.users, {
            foreignKey: 'id', as: 'user_id'
        });
    }
    return PhoneNumber;
}