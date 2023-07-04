const { DataTypes } = require("sequelize");
const { v4: UUIDV4 } = require("uuid");

module.exports = (sequelize) =>{
  sequelize.define('Activity',{
      id: {
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
          primaryKey: true,
      },
      name: {
          type: DataTypes.ENUM('Trekking', 'Caminata', 'Bike Tour', 'City Tour', 'Gastronomic Circuit', 'Rapel', 'Shopping', 'Museum Circuit', 'Free Choice'),
          allowNull: false,
        },
      difficulty: {
          type: DataTypes.ENUM('1 (Dificultad Nula)', '2 (Dificultad Baja)', '3 (Dificultad Media)', '4 (Dificultad Elevada)', '5 (Dificultad Extrema)'),
          allowNull: false,
      },
      duration: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      season: {
          type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno' , 'Primavera'),
          allowNull: false,
      }
  },{timestamps: false})
}