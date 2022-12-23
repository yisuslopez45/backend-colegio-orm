const { Router } = require('express');
const express = require('express');
const login = require('../controller/login.controller');
const router = express.Router();
const path = require('path');
const Swal = require('sweetalert2');
const { stringify } = require('querystring');
const { generarJwt } = require('../utils/jwtAuth');
const { tokenAdmin } = require('../utils/rolAdmin');

router.post('/login', async(req,res)=>{

    const {correo, password} = req.body;

    const respuesta = await login.logeo(correo, password)

    if(respuesta === "Correo Incorrecto" || respuesta === "Contraseña Incorrecta"){
        return res.status(400).json({
            message: respuesta,
            code: -1
        });
    }
    
    const payload = {
        nombreUsuario : respuesta[0].nombre +" "+ respuesta[0].apellido,
        idRol :  respuesta[0].id_rol,
        id_usuario : respuesta[0].id_usuario
    }
    const tokenGenerado = generarJwt(payload)

    res.status(200).json({
        msg: "Se inicio sesión Correctamente",
        code: 0,
        tokenGenerado,
        nombreUsuario: respuesta[0].nombre +" "+ respuesta[0].apellido,
        id_usuario  : respuesta[0].id_usuario,
        idRol : respuesta[0].id_rol,
    })
        
})


router.post('/registrarUsuario',  [tokenAdmin] , async(req,res)=>{

    try {
        
        const {nombre, apellido, correo, password} = req.body;

        const campos = [
            {
                nombre: "nombre",
                valor: nombre
            },
            {
                nombre: "apellido",
                valor: apellido
            },
            {
                nombre: "correo",
                valor: correo
            },
            {
                nombre: "password",
                valor: password
            }
        ]

        const camposVacios = campos.find( item => !item.valor);

        if (camposVacios) {
            return res.status(400).json({
                msg: `No ingreso el campo ${camposVacios.nombre}`,
                code: -1
            });
        }

        const respuesta =  await login.registrar(req);

        if(respuesta){

            res.status(200).json({
                msg: 'registro exitoso'
            })
        }else{
            return res.status(400).json({
                msg: "error el registro"
            })
        }
        


    } catch (error) {
        console.log("error: "+error)
    }


})









module.exports = router







