module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define('payments', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },  
        cc_company: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        exp_month: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        exp_year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cvv_code: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        primary: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
    })
    Payment.associate = (models) => {
        Payment.belongsTo(models.users, {
            foreignKey: 'id', as: 'user_id'
        });
    }
    return Payment;
}