
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const materia = require('../controller/materia.controller');
const { tokenAdmin } = require('../utils/rolAdmin');
const { tokenDocente } = require('../utils/rolDocente');

router.get('/consultarMaterias', [tokenAdmin] ,async(req,res)=>{

    try {
        
    const respuesta = await materia.consultarMaterias();
    res.status(200).json({
         data : respuesta
    })

    } catch (error) {
        console.log(error)

    }

})



router.get('/consultarMaterias/:id_usuario', [tokenDocente]  ,async(req,res)=>{

    try {
        
        const respuesta  = await materia.consultarMateriasbyDocente(req.params.id_usuario)

        if(JSON.stringify(respuesta)==="[]"){
            return res.status(400).json({
                code: -1,
                msg: "El id no tiene materias asignadas"
            })
        }

        res.status(200).json({
            data : respuesta
       })
   
    } catch (error) {
        
    }



} )

module.exports= router