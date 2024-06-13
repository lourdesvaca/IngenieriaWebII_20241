module.exports = app => {
    const controller = require("../controllers/cancion.controller.js");
    let router = require("express").Router();

    router.get("/", controller.listCancions);
    router.get("/:id", controller.getCancion);
    router.post("/", controller.createCancion);
    router.put("/:id", controller.updateCancion);
    router.patch("/:id", controller.updateCancion);
    router.delete("/:id", controller.deleteCancion);

    app.use('/api/cancions', router);
}