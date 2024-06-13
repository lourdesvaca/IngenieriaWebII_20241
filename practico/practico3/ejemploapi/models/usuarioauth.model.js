module.exports = (sequelize, Sequelize) => {
    const UsuarioAuth = sequelize.define("usuarioauth", {
        usuario_id: {
            type: Sequelize.INTEGER
        },
        token: {
            type: Sequelize.STRING
        },
    })
    return UsuarioAuth;
};