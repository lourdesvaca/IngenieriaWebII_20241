module.exports = app => {
//rutas de acceso
    require("./genero.routes")(app);
    require("./artista.routes")(app);
    require("./album.routes")(app);
    require("./cancion.routes")(app);
    require("./artistaxgenero.routes")(app);
}