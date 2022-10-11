
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()






const logeo = async(correo, pass)=>{

    try {
        
        const respuesta = await prisma.t_usuario.findMany({
            where: {
                
                correo: correo,
                password : pass
                
            }
        })

         return respuesta

    } catch (error) {
      console.log(error)
    }
}

module.exports = {logeo}