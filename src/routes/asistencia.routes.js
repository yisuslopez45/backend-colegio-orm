

const { Router } = require('express');
const express = require('express');
const router = express.Router();
const asistencia = require('../controller/asistencia.controller');
const { tokenAdmin } = require('../utils/rolAdmin');
const { tokenDocente } = require('../utils/rolDocente');


router.post('/crearRegistro', [tokenDocente], async (req, res) => {

    try {
        const respuesta = await asistencia.crearRegistro(req);

        if (typeof (respuesta) == "undefined") {
            return res.status(400).json({
                code: -1,
                msg: "Error en la insercion"
            })
        }
        res.status(200).json({
            code: 1,
            msg: "se inserto la asistencia"
        })

    } catch (error) {
        console.log(error)
    }

})


router.get('/RegistroAsistencia/:idUsuario', [tokenAdmin], async (req, res) => {

    try {

        const respuesta = await asistencia.informeAsistencia(req.params.idUsuario);

        if (JSON.stringify(respuesta) === "[]") {
            return res.status(400).json({
                code: -1,
                msg: "El id de docente no existe"
            })
        }

        res.status(200).json({
            data: respuesta
        })

    } catch (error) {
        console.log(error)
    }


})

router.get('/verRegistros/:idusuario', [tokenDocente], async (req, res) => {

    try {
        const respuesta = await asistencia.verAsistencia(req.params.idusuario);

        if (JSON.stringify(respuesta) === "[]") {
            return res.status(400).json({
                code: -1,
                msg: "No tiene Registros"
            })
        }

        res.status(200).json({
            data: respuesta
        })

    } catch (error) {
        console.log(error)
    }
})


router.put("/actualizarRegistro", [tokenDocente]  , async (req, res) => {
    try {

        const camposEditados = await asistencia.actualizarRegistro(req)

        if (camposEditados == 0) {
            return res.status(400).json({
                code: -1,
                msg: "Ocurrio un error al actualizar"
            })
        }
        res.status(200).json({
            code: 1,
            msg: "se actualizo correctamente"
        })

    } catch (error) {
        console.log(error)
    }
})

router.delete('/eliminarRegistro/:id', [tokenDocente]  ,async (req, res) => {
    try {
        const respuesta = await asistencia.eliminarRegistro(req.params.id)

        if (!respuesta) {
            return res.status(400).json({
                code: -1,
                msg: "error al eliminar"
            })
        }

        res.status(200).json({
            code: 1,
            msg: "se elimino correctamente"
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router