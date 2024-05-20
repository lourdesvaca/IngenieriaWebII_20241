const db = require("../models");
const { generarTokenUsuario } = require("../utils/code.utils");
const { stringToSha1 } = require("../utils/crypto.utils");
const { checkRequiredFields } = require("../utils/request.utils");

exports.generateUserToken = async (req, res) => {
    const requiredFields = ["email", "password"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message:
                `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    const { email, password } = req.body;

    const usuariologin = await db.usuariologins.findOne({
        where: {
            email,
            password: stringToSha1(password)
        }
    });
    if (!usuariologin) {
        res.status(401).send({ message: "Usuario o contraseña incorrectos" });
        return;
    }
    const token = generarTokenUsuario();
    await db.tokens.create({
        token,
        usuario_id: usuariologin.id
    });
    res.send({ token });
}
exports.registerUser = async (req, res) => {
    const requiredFields = ["email", "password"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message:
                `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }
    const { email, password } = req.body;
    const usuariologinDB = await db.usuariologins.findOne({
        where: {
            email
        }
    });
    if (usuariologinDB) {
        res.status(400).send({
            message: "El email ya está registrado"
        });
        return;
    }
    const usuariologin = await db.usuariologins.create({
        email,
        password: stringToSha1(password)
    });
    usuariologin.password = undefined;
    res.send(usuariologin);
}
