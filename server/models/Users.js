module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cnp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        faculty: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    });

    return Users;
};