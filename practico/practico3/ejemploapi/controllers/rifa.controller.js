const db = require("../models");
const { checkRequiredFields, sendError500 } = require("../utils/request.utils");

//get lista de Artista
exports.listRifas = async (req, res) =>{
    try{
        const rifas = await db.rifas.findAll()
        res.send(this.listRifas);
    }catch(error){
        sendError500(res);
    }
    
}

//get  by id de rifa
exports.getRifa = async (req, res) =>{
    const id = req.params.id;
    try{
        const rifa = await db.rifas.findByPk(id);
        if(!rifa){
            res.status(404).send({message: "Rifa no encontrado"});
            return;
        } 
        res.send(rifa);
    }catch(error){
        sendError500(res);
    }
}

//insert a la tabla
exports.createRifa = async (req, res) =>{
    const requiredFields = ["nombre", "cantTickets", "usuarioCreador", "codigoTicket", "estado"]
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if(fieldsWithErrors.length > 0){
        res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
        return;
    }
    try{
        const rifa = await db.rifas.create(req.body);
        res.send(rifa);
    }catch(error){
        sendError500(res);
    }
}

//update rifa
exports.updateRifa = async (req, res) =>{
    const id = req.params.id;
    try{
        const rifa= await db.rifas.findByPk(id);
        if(!rifa){
            res.status(404).send({message: "Rifa no encontrado"})
            return;
        }
        
        if(req.method === "PUT"){
            const requiredFields = ["nombre","cantTickets", "usuarioCreador", "codigoTicket", "estado"]
            const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
            if(fieldsWithErrors.length > 0){
                res.status(400).send({message: `Faltan los siguientes campos: ${field}`})
                return;
            }
        }
    
        await rifa.update(req.body);
        res.send({ message: "rifa actualizado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
    
}

//delete by id a la tabla
exports.deleteRifa = async (req, res) =>{
    const id = req.params.id;
    try{
        const rifa = await db.rifas.findByPk(id);
        if(!rifa){
            res.status(404).send({message: "Rifa no encontrado"});
            return;
        } 
        await rifa.destroy();
        res.send({ message: "Rifa eliminado satisfactoriamente" });
    }catch(error){
        sendError500(res);
    }
}
