const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt");

const prisma = new PrismaClient()



const crearUsuario = async(req)=>{

    try {
    
        const { nombres, apellidos, cedula, telefono , password, correo , cod_rol, direccion, ciudad , id_sexo, id_materia, id_profesion } = req.body
        
        const passwordHash = await bcrypt.hash(password, 10);

        const usuario = await prisma.t_usuario.create({
            data:{
                nombre: nombres,
                apellido: apellidos,
                cedula: cedula,
                telefono: telefono,
                password: passwordHash,
                correo: correo,
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