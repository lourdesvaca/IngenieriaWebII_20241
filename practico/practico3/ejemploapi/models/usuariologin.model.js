module.exports = (sequelize, Sequelize) => {
    const UsuarioLogin = sequelize.define("usuariologin", {
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING
        },
    })
    return UsuarioLogin;
};