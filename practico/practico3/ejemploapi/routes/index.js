module.exports = app => {
    // rutas de acceso
    require("./rifa.routes")(app);
    require("./usuario.routes")(app);
    require("./usuarioparticipante.routes")(app);
    require("./auth.routes")(app);
}