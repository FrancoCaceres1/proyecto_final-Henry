const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require("./src/db.js");
const PORT = 3001;

conn
  .sync({ force: false })
  .then(async () => {
    server.listen(PORT, async () => {
      const dbCountries = await Country.findAll();

      if (!dbCountries.length) {
        const urlApi = await axios.get("http://localhost:5000/countries");
        const infoApi = await urlApi.data.map((e) => {
          return {
            id: e.cca3,
            name: e.name.common,
            image: e.flags.svg,
            continent: e.continents[0],
            capital: e.capital ? e.capital[0] : "Not Found",
            subregion: e.subregion ? e.subregion : "Not Found",
            area: e.area,
            population: e.population,
          };
        });

        for (let i = 0; i < infoApi.length; i++) {
          await Country.findOrCreate({
            where: { name: infoApi[i].name },
            defaults: infoApi[i],
          });
        }
      }
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
