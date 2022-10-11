
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const programarSemestre =async(req)=>{

    try {
    
        const { intencidad, id_materia,id_docente,precio_hora,semestre} = req.body   

        const crearSemestre = await prisma.t_mat_asig.create({
            data:{
                intencidad : intencidad,
                id_materia : id_materia,
                id_docente : id_docente,
                precio_hora : precio_hora,
                semestre : semestre
            }
        })

        return crearSemestre

    } catch (error) {
        console.log(error)
    }
   


}



module.exports = {programarSemestre}