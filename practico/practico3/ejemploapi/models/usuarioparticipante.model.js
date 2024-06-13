module.exports = (sequelize, Sequelize) => {
    const UsuarioParticipante = sequelize.define("usuarioparticipante", {
        idUsuario: {
            type: Sequelize.INTEGER,
        },
        idRifa: {
            type: Sequelize.INTEGER
        },
        numeroTicket: {
            type: Sequelize.INTEGER
        },
        ganador: {
            type: Sequelize.BOOLEAN
        }
    })
    return UsuarioParticipante;
};