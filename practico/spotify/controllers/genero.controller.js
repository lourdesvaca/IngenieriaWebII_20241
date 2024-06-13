const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

//get lista de generos
exports.listGeneros = async (req, res) =>{
    try{
        const generos = await db.generos.findAll()
        res.send(generos);
    }catch(error){
        sendError500(res);
    }
    
}

//get lista de generos
exports.getGenero = async (req, res) =>{
    const id = req.params.id;
    try{
        const genero = await db.generos.findByPk(id);
        if(!genero){
            res.status(404).send({message: "Género no encontrado"});
            return;
        } 
        res.send(genero);
    }catch(error){
        sendError500(res);
    }
    
}

//insert a la tabla
exports.createGenero = async (req, res) =>{
    const requiredFields = ["nombre"]
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if(fieldsWithErrors.length > 0){
        res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
        return;
    }
    try{
        const genero = await db.generos.create(req.body);
        res.send(genero);
    }catch(error){
        sendError500(res);
    }
}

//update genero
exports.updateGenero = async (req, res) =>{
    const id = req.params.id;
    try{
        const genero = await db.generos.findByPk(id);
        if(!genero){
            res.status(404).send({message: "Género no encontrado"})
            return;
        }
        
        if(req.method === "PUT"){
            const requiredFields = ["nombre"]
            const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
            if(fieldsWithErrors.length > 0){
                res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
                return;
            }
        }
    
        await genero.update(req.body);
        res.send({ message: "Género actualizado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
    
}

//delete by id a la tabla
exports.deleteGenero = async (req, res) =>{
    const id = req.params.id;
    try{
        const genero = await db.generos.findByPk(id);
        if(!genero){
            res.status(404).send({message: "Género no encontrado"});
            return;
        } 
        await genero.destroy();
        res.send({ message: "Género eliminado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
}

/*
exports.uploadGeneroPicture = async (req, res) => {
    const genero  = await db.generos.findByPk(req.params.id);
    const imagen = req.files?.foto;
    if(!imagen){
        res.status(400).send({ message: "El campo foto es requerido" });
        return;
    }
    const nombreArchivo = `${genero.id}.png`;
    // eslint-disable-next-line no-undef
    imagen.mv(__dirname + `/../public/images/generos/${nombreArchivo}`);
    res.send({ message: "Foto subida correctamente" });
}
*/