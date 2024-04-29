const express = require('express')
const app = express();
const port = 3000;

//body parser para leer los datos del formulario
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//file upload
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
}));



//base de datos
const db = require("./models");
db.sequelize.sync(/*{ force: true }*/).then(() => {
    console.log("db resync");
});
require("./routes")(app);


//BODY PARSER COMPLETO
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ message: "Invalid data" })
    }

    next();
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

