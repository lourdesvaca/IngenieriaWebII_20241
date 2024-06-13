module.exports = app => {
    const controller = require("../controllers/artistaxgenero.controller.js");
    let router = require("express").Router();

    router.get("/", controller.listArtistaxgeneros);
    router.get("/:id", controller.getArtistaxgenero);
    router.post("/", controller.createArtistaxgenero);
    router.put("/:id", controller.updateArtistaxgenero);
    router.patch("/:id", controller.updateArtistaxgenero);
    router.delete("/:id", controller.deleteArtistaxgenero);
    app.use('/api/artistaxgeneros', router);
}