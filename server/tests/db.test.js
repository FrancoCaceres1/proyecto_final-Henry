const { sequelize, Country, Activity } = require("../src/db");

describe("Database Tests", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should establish a database connection", () => {
    expect(sequelize.authenticate()).resolves.not.toThrow();
  });

  it("Should create database tables", async () => {
    await sequelize.sync();

    const tableExists = await sequelize.showAllSchemas();
    expect(tableExists).toContain(DB_NAME);
  });

  it("Should define correct table relationships", async () => {
    const country = await Country.create({ name: "Country 1" });
    const activity = await Activity.create({ name: "Activity 1" });

    await country.addActivity(activity);

    const result = await country.getActivities();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Activity 1");
  });
});