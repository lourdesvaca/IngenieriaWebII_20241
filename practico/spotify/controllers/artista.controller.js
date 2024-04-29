const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

//get lista de Artista
exports.listArtistas = async (req, res) =>{
    try{
        const artistas = await db.artistas.findAll()
        res.send(artistas);
    }catch(error){
        sendError500(res);
    }
    
}

//get lista de Artista
exports.getArtista = async (req, res) =>{
    const id = req.params.id;
    try{
        const artista = await db.artistas.findByPk(id);
        if(!artista){
            res.status(404).send({message: "Artista no encontrado"});
            return;
        } 
        res.send(artista);
    }catch(error){
        sendError500(res);
    }
    
}

//insert a la tabla
exports.createArtista = async (req, res) =>{
    const requiredFields = ["nombre"]
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if(fieldsWithErrors.length > 0){
        res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
        return;
    }
    try{
        const artista = await db.artistas.create(req.body);
        res.send(artista);
    }catch(error){
        sendError500(res);
    }
}

//update genero
exports.updateArtista = async (req, res) =>{
    const id = req.params.id;
    try{
        const artista= await db.artistas.findByPk(id);
        if(!artista){
            res.status(404).send({message: "Artista no encontrado"})
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
    
        await artista.update(req.body);
        res.send({ message: "Artista actualizado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
    
}

//delete by id a la tabla
exports.deleteArtista = async (req, res) =>{
    const id = req.params.id;
    try{
        const artista = await db.artistas.findByPk(id);
        if(!artista){
            res.status(404).send({message: "Artista no encontrado"});
            return;
        } 
        await artista.destroy();
        res.send({ message: "Artista eliminado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
}

/*
exports.uploadArtistaPicture = async (req, res) => {
    const artista = await db.artistas.findByPk(req.params.id);
    const imagen = req.files?.foto;
    if(!imagen){
        res.status(400).send({ message: "El campo foto es requerido" });
        return;
    }
    const nombreArchivo = `${artista.id}.png`;
    // eslint-disable-next-line no-undef
    imagen.mv(__dirname + `/../public/images/artistas/${nombreArchivo}`);
    res.send({ message: "Foto subida correctamente" });
}
*/