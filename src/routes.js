const routes = require("express").Router();
const ChocolateController = require("./app/controllers/ChocolateController");
const UserController = require("./app/controllers/UserController");

// rota de autenticacao
routes.post("/user/auth", UserController.auth); // localhost:3000/user/auth

// rotas dos usuarios
routes.post("/user", UserController.store);
routes.get("/user", UserController.index);
routes.get("/user/:userId", UserController.show);
routes.put("/user/:userId", UserController.update);
routes.delete("/user/:userId", UserController.destroy);

// rotas dos chocolates
routes.get("/", ChocolateController.index);
routes.post("/", ChocolateController.store);
routes.get("/:id", ChocolateController.show);
routes.put("/:id", ChocolateController.update);
routes.delete("/:id", ChocolateController.destroy);

module.exports = routes;
