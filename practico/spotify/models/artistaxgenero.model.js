module.exports = (sequelize, Sequelize) => {
    const ArtistaxGenero = sequelize.define("artistaxgenero", {
        genero_id: {
            type: Sequelize.INTEGER,
        },
        artista_id: {
            type: Sequelize.INTEGER
        }
    })
    return ArtistaxGenero;
};