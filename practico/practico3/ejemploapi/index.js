const express = require('express');
const cors = require('cors')
const app = express();

//variables del entorno
require('dotenv').config()

// eslint-disable-next-line no-undef
const port = process.env.PORT;

//cors
const corsOptions = {
    origin: 'http://localhost:5173',
}
app.use(cors(corsOptions))

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

//carpetas estáticas
app.use(express.static('public'));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ message: "Invalid data" })
    }

    next();
});

//base de datos
const db = require("./models");
db.sequelize.sync(/*{ force: true }*/).then(() => {
    console.log("db resync");
});
require("./routes")(app);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});