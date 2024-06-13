exports.checkRequiredFields = (requiredFields, body) => {
    const fieldsWithErrors = []
    for (const field of requiredFields){
        if(!body[field]){
            fieldsWithErrors.push(field);
        }
    }
    return fieldsWithErrors;
};

exports.sendError500 = (res) =>{
    res.status(500).send({
        message: "Ocurrió un error"
    });
};