module.exports = (sequelize, Sequelize) => {
    const Artista = sequelize.define("artista", {
        nombre: {
            type: Sequelize.STRING,
        }
    })
    return Artista;
};