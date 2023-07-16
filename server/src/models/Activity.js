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
        type: DataTypes.ENUM("Soft", "Easy", "Normal", "Difficult", "Hard"),
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
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
