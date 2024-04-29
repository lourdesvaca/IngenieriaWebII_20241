const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

//get lista total
exports.listArtistaxgeneros = async (req, res) =>{
    try{
        const artistaxgeneros = await db.artistaxgeneros.findAll()
        res.send(artistaxgeneros);
    }catch(error){
        sendError500(res);
    }
    
}

//get lista by id
exports.getArtistaxgenero = async (req, res) =>{
    const id = req.params.id;
    try{
        const artistaxgenero = await db.artistaxgeneros.findByPk(id);
        if(!artistaxgenero){
            res.status(404).send({message: "Artistaxgenero no encontrado"});
            return;
        } 
        res.send(artistaxgenero);
    }catch(error){
        sendError500(res);
    }
    
}

//insert de datos a la tabla
exports.createArtistaxgenero = async (req, res) =>{
    const requiredFields = ["genero_id", "artista_id"]
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if(fieldsWithErrors.length > 0){
        res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
        return;
    }
    try{
        const artistaxgenero = await db.artistaxgeneros.create(req.body);
        res.send(artistaxgenero);
    }catch(error){
        sendError500(res);
    }
}

//update de 1 dato
exports.updateArtistaxgenero = async (req, res) =>{
    const id = req.params.id;
    try{
        const artistaxgenero = await db.artistaxgeneros.findByPk(id);
        if(!artistaxgenero){
            res.status(404).send({message: "artistaxgenero no encontrado"})
            return;
        }
        
        if(req.method === "PUT"){
            const requiredFields = ["genero_id", "artista_id"]
            const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
            if(fieldsWithErrors.length > 0){
                res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
                return;
            }
        }
    
        await artistaxgenero.update(req.body);
        res.send({ message: "artistaxgenero actualizado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
    
}

//delete by id a la tabla
exports.deleteArtistaxgenero = async (req, res) =>{
    const id = req.params.id;
    try{
        const artistaxgenero = await db.artistaxgeneros.findByPk(id);
        if(!artistaxgenero){
            res.status(404).send({message: "artistaxgenero no encontrado"});
            return;
        } 
        await artistaxgenero.destroy();
        res.send({ message: "artistaxgenero eliminado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
}