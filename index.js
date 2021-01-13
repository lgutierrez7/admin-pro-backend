require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear el servgidor de express
const app = express();

//configurar CORS
app.use(cors());

//lectura y parse del request
app.use(express.json());

//Base de datos

dbConnection();


//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/upload'));


/*
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });

});*/

app.listen(process.env.port, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.port);
});