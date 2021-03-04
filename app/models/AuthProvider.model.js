module.exports = (sequelize, Sequelize) => {
    const AuthProvider = sequelize.define("auth_provider", {
        uid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        provider: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'local'
        },
        providerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
  
    return AuthProvider;
};
