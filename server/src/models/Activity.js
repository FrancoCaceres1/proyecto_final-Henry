const { DataTypes } = require("sequelize");
const { v4: UUIDV4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM(
          "Trekking",
          "Hike",
          "Bike Tour",
          "City Tour",
          "Gastronomic Circuit",
          "Rapel",
          "Shopping",
          "Museum Circuit"
        ),
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        isInt: true,
        min: 1,
        max: 5,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        isInt: true,
        min: 1,
        max: 12,
        checkDuration(value) {
          if (value > 12) {
            throw new ValidationError("The duration cannot be more than 12 hours");
          }
        },
      },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
