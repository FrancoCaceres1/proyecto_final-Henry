const { Router } = require("express");
const {
  postActivities,
  getAllActivities,
  deleteActivities,
} = require("../controllers/index");

const activitiesRouter = Router();

activitiesRouter.post("/", async (req, res) => {
  const { name, difficulty, duration, season, pais } = req.body;

  try {
    if (!name || !difficulty || !duration || !season || !pais) {
      throw Error("Falta información para crear la actividad");
    }
    const newActivity = await postActivities(
      name,
      difficulty,
      duration,
      season,
      pais
    );
    return res.status(200).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

activitiesRouter.get("/", async (req, res) => {
  try {
    const allActivities = await getAllActivities();
    res.status(200).json(allActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

activitiesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw Error(`${id} no existe para eliminar`);
    } else {
      const deleteActivity = await deleteActivities(id);
      res.status(200).json(deleteActivity);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle requests to unknown routes
activitiesRouter.all("*", (req, res) => {
  res.status(404).send(`Unknown route: ${req.method} ${req.originalUrl}`);
});

module.exports = activitiesRouter;
