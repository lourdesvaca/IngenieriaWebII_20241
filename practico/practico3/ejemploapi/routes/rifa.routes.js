const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/rifa.controller.js");
    let router = require("express").Router();

    router.get("/", checkUserMiddleware, controller.listRifas);
    router.get("/:id", checkUserMiddleware, controller.getRifa);
    router.post("/", checkUserMiddleware, controller.createRifa);
    router.put("/:id", checkUserMiddleware, controller.updateRifa);
    router.patch("/:id", checkUserMiddleware, controller.updateRifa);
    router.delete("/:id", checkUserMiddleware, controller.deleteRifa);

    app.use('/api/rifas', router);
}