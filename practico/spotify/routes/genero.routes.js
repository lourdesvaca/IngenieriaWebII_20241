//const { checkUserMiddleware } = require("../middlewares/check-user.middleware")
module.exports = app => {
    const controller = require("../controllers/genero.controller.js");
    let router = require("express").Router();
    //router.get("/", checkUserMiddleware, controller.listGeneros);

    router.get("/", controller.listGeneros);
    router.get("/:id", controller.getGenero);
    router.post("/", controller.createGenero);

    //actualización que te exige todos los campos del objeto
    router.put("/:id", controller.updateGenero);
    //actualización que permite actualizar con 1 o 0 propiedades
    router.patch("/:id", controller.updateGenero);
    
    router.delete("/:id", controller.deleteGenero);



    app.use('/api/generos', router);
}