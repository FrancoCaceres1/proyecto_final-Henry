const { Router } = require("express");
const {
  getAllCountries,
  getCountryById,
  getCountryByName,
} = require("../controllers/index");

const countriesRouter = Router();

countriesRouter.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const countriesName = await getCountryByName(name);

      if (!countriesName.length) {
        throw Error(`Country ${name} not found`);
      } else {
        res.status(200).json(countriesName);
      }
    } else {
      const allCountries = await getAllCountries();
      return res.status(200).json(allCountries);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

countriesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const countryId = await getCountryById(id);

    if (!countryId.length) {
      throw Error(`Country ${id} not found`);
    } else {
      return res.status(200).json(countryId);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

countriesRouter.all("*", (req, res) => {
  res.status(404).send(`Unknown route: ${req.method} ${req.originalUrl}`);
});

module.exports = countriesRouter;
