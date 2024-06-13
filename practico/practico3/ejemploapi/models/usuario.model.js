module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        nombreCompleto: {
            type: Sequelize.STRING,
        },
        telefono: {
            type: Sequelize.INTEGER
        },
        correo: {
            type: Sequelize.STRING
        },
        contraseña: {
            type: Sequelize.STRING
        },
    })
    return Usuario;
};