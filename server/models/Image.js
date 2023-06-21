module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
    });

    return Image;
};