const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.artistas = require("./artista.model")(sequelize, Sequelize);
db.generos = require("./genero.model")(sequelize, Sequelize);

// Relación entre artistas y álbumes
db.albums = require("./album.model")(sequelize, Sequelize);
db.artistas.hasMany(db.albums, { as: "albums", foreignKey: "artista_id", onDelete: "CASCADE" });
db.albums.belongsTo(db.artistas, { foreignKey: "artista_id", as: "artista" });

// Relación entre canciones y albumes
db.cancions = require("./cancion.model")(sequelize, Sequelize);
db.albums.hasMany(db.cancions, {as: "cancions", foreignKey: "album_id", onDelete:"CASCADE"});
db.cancions.belongsTo(db.albums,{foreignKey: "album_id", as: "album"})


// Relación entre artistas y generos
db.artistaxgeneros = require("./artistaxgenero.model")(sequelize, Sequelize);
db.generos.hasMany(db.artistaxgeneros, {as: "artistaxgeneros", foreignKey: "genero_id", onDelete:"CASCADE"});
db.artistaxgeneros.belongsTo(db.generos,{foreignKey: "genero_id", as: "genero"});
db.artistas.hasMany(db.artistaxgeneros, {as: "artistaxgeneros", foreignKey: "artista_id", onDelete:"CASCADE"});
db.artistaxgeneros.belongsTo(db.artistas,{foreignKey: "artista_id", as: "artista"});


module.exports = db;