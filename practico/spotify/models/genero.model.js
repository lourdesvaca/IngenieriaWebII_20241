module.exports = (sequelize, Sequelize) => {
    const Genero = sequelize.define("genero", {
        nombre: {
            type: Sequelize.STRING,
        }
    })
    return Genero;
};