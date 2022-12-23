const { Router } = require('express');
const express = require('express');
const router = express.Router();
const profesion = require('../controller/profesion.controller');
const { tokenAdmin } = require('../utils/rolAdmin');

router.get('/consultarProfesiones', [tokenAdmin] ,async(req,res)=>{

    try {
        
    const respuesta = await profesion.consultarProfesiones();

    res.status(200).json({
         data : respuesta
    })

    } catch (error) {
                console.log(error)

    }


})

module.exports = router