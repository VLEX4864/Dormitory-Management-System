module.exports = (sequelize, DataTypes) => {

    const Dorms = sequelize.define("Dorms", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        administrator: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Dorms.associate = (models) => {
        Dorms.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };

    return Dorms;
};