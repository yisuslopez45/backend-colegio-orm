const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const consultarProfesiones = async()=>{

    try {
    
        const respuesta = await prisma.t_profesion.findMany()

        return respuesta

    } catch (error) {
        console.log(error)
    }
   
}


module.exports={consultarProfesiones}
