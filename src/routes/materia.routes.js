
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const materia = require('../controller/materia.controller');

router.get('/consultarMaterias', async(req,res)=>{

    try {
        
    const respuesta = await materia.consultarMaterias();


    res.status(200).json({
         data : respuesta
    })


    } catch (error) {
                console.log(error)

    }


})



router.post('/consultarMateriaBydocente',async(req,res)=>{

    try {
        
        const respuesta  = await materia.consultarMateriasbyDocente(req.body.id)


        if(JSON.stringify(respuesta)==="[]"){
            return res.status(400).json({
                code: -1,
                msg: "El id no tiene materias asignadas"
            })
        }

        res.status(200).json({
            respuesta
       })
   


    } catch (error) {
        
    }



} )

module.exports= router