const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/usuario.controller.js");
    let router = require("express").Router();

   
    app.use('/api/usuarios', router);
}