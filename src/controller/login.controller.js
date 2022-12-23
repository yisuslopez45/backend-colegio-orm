
const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt")
const prisma = new PrismaClient()


const logeo = async (correo, pass) => {

    try {

        const respuesta = await prisma.t_usuario.findMany({
            where: {
                correo: correo,
            }
        })

        if(!respuesta[0]){
           return "Correo Incorrecto"
        }else{
          const coinciden = await bcrypt.compare(pass,respuesta[0].password);
            if(coinciden){
                return respuesta
            }else{
                return "Contraseña Incorrecta"
            }
        }


    } catch (error) {
        console.log(error)
    }
}

module.exports = { logeo }