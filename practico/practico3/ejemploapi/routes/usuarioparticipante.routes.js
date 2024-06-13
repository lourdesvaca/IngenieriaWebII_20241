const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/usuarioparticipante.controller.js");
    let router = require("express").Router();

   
    app.use('/api/usuarioparticipantes', router);
}