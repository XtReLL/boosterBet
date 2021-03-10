module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        sum: {
            type: Sequelize.DOUBLE
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 'balance'
        }
    });
  
    return Payment;
};