
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Usuario = require('../controller/usuario.controller');







router.post("/crearUsuario", async(req, res)=>{


    try {
        
        const {  password,password2 } = req.body
    
        const respuesta = await Usuario.crearUsuario(req);
        
        console.log( typeof(respuesta))

        if(password != password2){
            return res.status(400).json({
                code: -2,
                msg: "Contraseña no son iguales"
            })
        }

        if(typeof(respuesta) == "undefined" ){
            return res.status(400).json({
                code: -1,
                msg: "Error al insertar, seleccione un Rol"
            })
        }

        res.status(200).json({
            code: "1",
            msg: "se inserto la informacion"
        })


    } catch (error) {
        console.log(error)
    }

    })







module.exports = router