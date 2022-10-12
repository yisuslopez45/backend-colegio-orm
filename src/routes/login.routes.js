const { Router } = require('express');
const express = require('express');
const login = require('../controller/login.controller');
const router = express.Router();
const path = require('path');
const Swal = require('sweetalert2');
const { stringify } = require('querystring');

router.post('/login', async(req,res)=>{

    const {correo, password} = req.body;

    const respuesta = await login.logeo(correo, password)

    if(JSON.stringify(respuesta)==="[]"){
        return res.status(400).json({
            message: 'correo incorrecto',
            code: -1
        });
    }

    console.log(respuesta)

    res.status(200).json({
        msg: "Se inicio sesión Correctamente",
        code: 0,
        nombreUsuario : respuesta[0].nombre +" "+ respuesta[0].apellido,
        idRol : respuesta[0].id_rol,
        id_usuario : respuesta[0].id_usuario
    })
        
})


router.post('/registrarUsuario', async(req,res)=>{

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







