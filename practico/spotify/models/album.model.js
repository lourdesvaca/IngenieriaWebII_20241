// Modelo de álbum
module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("album", {
        nombre: {
            type: Sequelize.STRING,
        },
        artista_id: {
            type: Sequelize.INTEGER
        }
    });
    return Album;
};

