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

db.rifas = require("./rifa.model")(sequelize, Sequelize);
db.usuarios = require("./usuario.model")(sequelize, Sequelize);
db.usuarioparticipantes = require("./usuarioparticipante.model")(sequelize, Sequelize);


db.usuarios.hasMany(db.rifas, { as: "rifas", foreignKey: "usuarioCreador", onDelete: "CASCADE"});
db.rifas.belongsTo(db.usuarios, {
    foreignKey: "usuarioCreador",
    as: "usuario",
});

db.usuarios.hasMany(db.usuarioparticipantes, { as: "usuarioparticipantes", foreignKey: "idUsuario", onDelete: "CASCADE"});
db.usuarioparticipantes.belongsTo(db.usuarios, {
    foreignKey: "idUsuario",
    as: "usuario",
});

db.rifas.hasMany(db.usuarioparticipantes, { as: "usuarioparticipantes", foreignKey: "idRifa", onDelete: "CASCADE"});
db.usuarioparticipantes.belongsTo(db.rifas, {
    foreignKey: "idRifa",
    as: "rifa",
});

/*db.rifas.hasMany(db.usuarioparticipantes, { as: "usuarioparticipantes", foreignKey: "numeroTicket", onDelete: "CASCADE"});
db.usuarioparticipantes.belongsTo(db.rifas, {
    foreignKey: "numeroTicket",
    as: "rifa",
});*/

db.usuariologins = require("./usuariologin.model")(sequelize, Sequelize);
db.tokens = require("./usuarioauth.model")(sequelize, Sequelize);
db.usuariologins.hasMany(db.tokens, { as: "tokens", foreignKey: "usuario_id", onDelete: "CASCADE"});
db.tokens.belongsTo(db.usuariologins, {
    foreignKey: "usuario_id",
    as: "usuario",
});
/*db.usuariologins.belongsTo(db.usuarios,{
    foreignKey: "usuario_id",
    as: "usuariologin",
})*/

module.exports = db;
