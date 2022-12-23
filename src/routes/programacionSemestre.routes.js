
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const programar = require('../controller/programacionSemestre.controller');
const { tokenAdmin } = require('../utils/rolAdmin');



router.post('/crearProSemestre', [tokenAdmin] ,async(req,res)=>{

    try {
        
        const respuesta = await programar.programarSemestre(req);

        if(typeof(respuesta)=="undefined" ){
            return res.status(400).json({
            code: -1,
            msg: "Error al crear Asignacion"
        })
        }

        res.status(200).json({
            code: 1,
            msg: "se inserto correctamente"
        })

    } catch (error) {
        console.log(error)
    }

})


module.exports = router