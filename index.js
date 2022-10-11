const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({path: '.env'});
const cors = require("cors");

const app = express()
const port = 4400

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/', require('./src/routes/profesion.routes'));
app.use('/', require('./src/routes/login.routes'));
app.use('/',  require('./src/routes/usuario.routes'));
app.use('/', require('./src/routes/materia.routes'))
app.use('/', require('./src/routes/docente.routes'));
app.use('/', require('./src/routes/programacionSemestre.routes'));
app.use('/', require('./src/routes/asistencia.routes'));

app.listen(port, ()=>{
    console.log('server funciona http://localhost:4400')

})