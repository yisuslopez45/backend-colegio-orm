const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const consultarMaterias = async()=>{

    try {
    
        const respuesta = await prisma.t_materia.findMany();

        return respuesta

    } catch (error) {
        console.log(error)
    }
   
}


const consultarMateriasbyDocente = async(id)=>{

    try {
    
        const respuesta = await prisma.t_mat_asig.findMany({
            
            distinct: ["id_materia"],
            where:{
                id_docente: id
            },
            include: {t_materia: true}        
            
        })

        let materias = []

        for (let i = 0; i < respuesta.length; i++) {

            materias[i] = {
                "asignatura" : respuesta[i].t_materia.asignatura,
                "id_materia" : respuesta[i].id_materia
            }
        }

        return materias

    } catch (error) {
        console.log(error)
    }
}

module.exports = {consultarMaterias, consultarMateriasbyDocente};

