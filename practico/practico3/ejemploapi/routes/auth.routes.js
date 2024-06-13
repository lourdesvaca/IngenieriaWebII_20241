const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/auth.controller.js");
    let router = require("express").Router();

    router.post("/login", controller.generateUserToken);
    router.post("/register", controller.registerUser);
    router.get("/me",checkUserMiddleware , controller.me);

    app.use('/api/', router);
}