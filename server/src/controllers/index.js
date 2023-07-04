const db = require("../db");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getAllCountries = async () => {
  const dbCountry = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
  return dbCountry;
};

const getCountryById = async (id) => {
  const countryFilter = await Country.findAll({
    where: { id },
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });

  return countryFilter;
};
const getCountryByName = async (name) => {
  const countryFiltered = await Country.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  return countryFiltered;
};

const postActivities = async (name, difficulty, duration, season, pais) => {
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });

  for (let i = 0; i < pais.length; i++) {
    const findCountry = await Country.findAll({ where: { name: pais[i] } });

    await newActivity.addCountries(findCountry);
  }

  const activity = await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return activity;
};

const getAllActivities = async () =>
  await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

const deleteActivities = async (id) =>
  await Activity.destroy({ where: { id } });

module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
  postActivities,
  getAllActivities,
  deleteActivities,
};
