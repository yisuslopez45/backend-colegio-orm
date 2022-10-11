const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const crearUsuario = async(req)=>{

    try {
    
        const { nombres, apellidos, cedula, telefono , password, email , cod_rol, direccion, ciudad , id_sexo, id_materia, id_profesion } = req.body

        const usuario = await prisma.t_usuario.create({
            data:{
                nombre: nombres,
                apellido: apellidos,
                cedula: cedula,
                telefono: telefono,
                password: password,
                correo: email,
                id_rol : cod_rol,
                direccion: direccion,
                ciudad: ciudad,
                id_sexo: id_sexo,
                id_materia: id_materia,
                id_profesion: id_profesion

            }
        })


        
        return usuario;

    } catch (error) {
        console.log(error)
    }
   
}





module.exports = {crearUsuario};