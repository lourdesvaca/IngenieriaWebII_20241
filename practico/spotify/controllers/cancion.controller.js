const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

//get lista de generos
exports.listCancions = async (req, res) =>{
    try{
        const cancions = await db.cancions.findAll()
        res.send(cancions);
    }catch(error){
        sendError500(res);
    }
}

//get lista de canciones
exports.getCancion = async (req, res) =>{
    const id = req.params.id;
    try{
        const cancion = await db.cancions.findByPk(id);
        if(!cancion){
            res.status(404).send({message: "Canción no encontrado"});
            return;
        } 
        res.send(cancion);
    }catch(error){
        sendError500(res);
    }
    
}

//insert de datos a la tabla
exports.createCancion = async (req, res) =>{
    const requiredFields = ["nombre", "album_id"]
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if(fieldsWithErrors.length > 0){
        res.status(400).send({message: `Faltan los siguientes campos: ${field}`});
        return;
    }
    try{
        const cancion = await db.cancions.create(req.body);
        res.send(cancion);
    }catch(error){
        sendError500(res);
    }
}

//update de 1 dato
exports.updateCancion = async (req, res) =>{
    const id = req.params.id;
    try{
        const cancion = await db.cancions.findByPk(id);
        if(!cancion){
            res.status(404).send({message: "canción no encontrado"});
            return;
        }
        
        if(req.method === "PUT"){
            const requiredFields = ["nombre", "album_id"]
            const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
            if(fieldsWithErrors.length > 0){
                res.status(400).send({message: `Faltan los siguientes campos: ${field}`});
                return;
            }
        }
    
        await cancion.update(req.body);
        res.send({ message: "Canción actualizado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
    
}

//delete by id a la tabla
exports.deleteCancion = async (req, res) =>{
    const id = req.params.id;
    try{
        const cancion = await db.cancions.findByPk(id);
        if(!cancion){
            res.status(404).send({message: "canción no encontrado"});
            return;
        } 
        await cancion.destroy();
        res.send({ message: "canción eliminado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
}

/*
exports.uploadAlbumPicture = async (req, res) => {
    const album  = await db.albums.findByPk(req.params.id);
    const imagen = req.files?.foto;
    if(!imagen){
        res.status(400).send({ message: "El campo foto es requerido" });
        return;
    }
    const nombreArchivo = `${album.id}.png`;
    // eslint-disable-next-line no-undef
    imagen.mv(__dirname + `/../public/images/albums/${nombreArchivo}`);
    res.send({ message: "Foto subida correctamente" });
}
*/