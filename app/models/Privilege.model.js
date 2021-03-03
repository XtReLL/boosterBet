module.exports = (sequelize, Sequelize) => {
    const Privilege = sequelize.define("privilege", {
        uid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        is_admin: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        is_moderator: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        is_media: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        is_esports: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        is_vip: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
        

    });
  
    return Privilege;
};