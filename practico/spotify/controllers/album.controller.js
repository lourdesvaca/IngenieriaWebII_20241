const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

//get lista de generos
exports.listAlbums = async (req, res) =>{
    try{
        const albums = await db.albums.findAll()
        res.send(albums);
    }catch(error){
        sendError500(res);
    }
}

//get lista total
exports.getAlbum = async (req, res) =>{
    const id = req.params.id;
    try{
        const album = await db.albums.findByPk(id);
        if(!album){
            res.status(404).send({message: "Album no encontrado"});
            return;
        } 
        res.send(album);
    }catch(error){
        sendError500(res);
    }
    
}

//insert de datos a la tabla
exports.createAlbum = async (req, res) =>{
    const requiredFields = ["nombre", "artista_id"]
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if(fieldsWithErrors.length > 0){
        res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
        return;
    }
    try{
        const album = await db.albums.create(req.body);
        res.send(album);
    }catch(error){
        sendError500(res);
    }
}

//update de 1 dato
exports.updateAlbum = async (req, res) =>{
    const id = req.params.id;
    try{
        const album = await db.albums.findByPk(id);
        if(!album){
            res.status(404).send({message: "Album no encontrado"})
            return;
        }
        
        if(req.method === "PUT"){
            const requiredFields = ["nombre", "artista_id"]
            const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
            if(fieldsWithErrors.length > 0){
                res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
                return;
            }
        }
    
        await album.update(req.body);
        res.send({ message: "Album actualizado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
    
}

//delete by id a la tabla
exports.deleteAlbum = async (req, res) =>{
    const id = req.params.id;
    try{
        const album = await db.albums.findByPk(id);
        if(!album ){
            res.status(404).send({message: "album  no encontrado"});
            return;
        } 
        await album.destroy();
        res.send({ message: "album eliminado satisfactoriamente" });
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