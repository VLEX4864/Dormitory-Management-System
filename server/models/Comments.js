module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Comments;
};