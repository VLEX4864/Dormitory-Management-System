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
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rooms: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_capacity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maps_link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
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