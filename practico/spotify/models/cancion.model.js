module.exports = (sequelize, Sequelize) => {
    const Cancion = sequelize.define("cancion", {
        nombre: {
            type: Sequelize.STRING,
        },
        album_id: {
            type: Sequelize.INTEGER
        }
    })
    return Cancion;
};