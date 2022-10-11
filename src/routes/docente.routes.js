
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const docente = require('../controller/docente.controller');

router.get('/consultarDocentes', async(req,res)=>{

    try {

    const respuesta = await docente.consultarDocentes();
    res.status(200).json({
         data: respuesta
    })

    } catch (error) {
        console.log(error)
    }


})

router.get('/consultarDocentesMateria/:idmateria', async(req,res)=>{

    try {

    const respuesta = await docente.consultarDocenteMateria(req.params.idmateria)
    res.status(200).json({
         data : respuesta
    })

    } catch (error) {
        console.log(error)
    }


})


router.get('/consultarDocenteCedula/:idCedula', async(req,res)=>{

    try {

    const respuesta = await docente.consultarDocenteCedula(req.params.idCedula);
    
    console.log(respuesta)

    if(typeof(respuesta)=="undefined"){

        return res.status(400).json({
            code: -1,
            msg:"el numero de cedula no pertenece a un usuario"
        })
    }
    res.status(200).json({
         data:respuesta
    })

    } catch (error) {
        console.log(error)
    }

})



module.exports= router