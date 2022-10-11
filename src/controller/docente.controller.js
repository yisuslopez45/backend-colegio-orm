
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const consultarDocentes = async()=>{

    try {

        const respuesta = await prisma.t_usuario.findMany({
            where:{
                id_rol:1
            }
        })

        return respuesta
         
    } catch (error) {
        console.log(error)
    }
   
}


const consultarDocenteCedula = async(cedula)=>{

    try {

        const respuesta = await prisma.t_usuario.findMany({

            where:{
                cedula: cedula
            },

            include:{
                t_roles:{
                    select:{
                        rol:true
                    }
                }
            }

        })

        const usuario = {
            "id_usuario": respuesta[0].id_usuario,
            "nombre": respuesta[0].nombre,
            "apellido": respuesta[0].apellido,
            "correo": respuesta[0].correo,
            "rol" : respuesta[0].t_roles.rol,
            "cedula": respuesta[0].cedula,
            "telefono": respuesta[0].telefono
        }
        console.log(respuesta)
        return usuario
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {consultarDocentes, consultarDocenteCedula};

