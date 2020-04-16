const routes = require("express").Router();
const ChocolateController = require("./app/controllers/ChocolateController");

routes.get("/", ChocolateController.index);
routes.post("/", ChocolateController.store);
routes.get("/:id", ChocolateController.show);
routes.put("/:id", ChocolateController.update);
routes.delete("/:id", ChocolateController.destroy);

module.exports = routes;
