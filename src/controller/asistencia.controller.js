
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const crearRegistro = async(req)=>{

    try {
        
        const {   id_docente ,id_materia ,horas_dictadas ,tema_dictado,num_estudiantes ,observacion} = req.body;
     
        const respuesta = await prisma.t_regis_asis.create({
            data:{
                id_docente : id_docente,
                id_materia : id_materia,
                horas_dictadas : horas_dictadas,
                tema_dictado : tema_dictado,
                num_estudiantes : num_estudiantes,
                observacion : observacion
            }
        })

         return respuesta


    } catch (error) {
        console.log(error)
    }


}



const informeAsistencia = async(id)=>{

    try {
        
        const consultaAsistencia = await prisma.t_regis_asis.groupBy({
            by: ['id_docente', "id_materia"],

            _sum: {horas_dictadas: true},

            where:{
                id_docente: parseInt(id)
            },

        })


        const consultaMateriasAsignadas = await prisma.t_mat_asig.findMany({
         
            where:{
                id_docente: parseInt(id)
            },

            include: {
                t_materia:{
                    select: {
                        asignatura:true
                    }
                }
            }

        })

        const asistenciaDocentes = []
              
        for (let i = 0; i < consultaAsistencia.length; i++) {
            asistenciaDocentes[i] ={ 
            "asignatura" : consultaMateriasAsignadas[i].t_materia.asignatura,
            "intencidad" : consultaMateriasAsignadas[i].intencidad,
            "precio_hora" : consultaMateriasAsignadas[i].precio_hora,
            "id_docente" : consultaMateriasAsignadas[i].id_docente,
            "dictadas" :  consultaAsistencia[i]._sum.horas_dictadas,
            "TotalPago" : parseInt( consultaAsistencia[i]._sum.horas_dictadas) * parseInt(consultaMateriasAsignadas[i].precio_hora)
            }
               
        }
           
        return asistenciaDocentes

    } catch (error) {
        console.log(error)
    }

}


const verAsistencia  = async(id)=>{

    try {
        
        const entradasAsistencia = await prisma.t_regis_asis.findMany({
            where:{
                id_docente: parseInt(id)
            },

        include:{
            t_materia:{
                select:{
                    asignatura:true
                }
            }
        }

        })

        let entradas = []


        for (let i = 0; i< entradasAsistencia.length; i++) {
            entradas[i]={
            "id_registro": entradasAsistencia[i].id_registro,
            "asignatura" : entradasAsistencia[i].t_materia.asignatura,
            "horas_dictadas": entradasAsistencia[i].horas_dictadas,
            "tema_dictado": entradasAsistencia[i].tema_dictado,
            "num_estudiantes": entradasAsistencia[i].num_estudiantes,
            "observacion": entradasAsistencia[i].observacion
            }
        }

        return entradas

    } catch (error) {
        console.log(error+"  FALLA asistencia.controller-->verAsistencia")
    }




}



const actualizarRegistro = async(req)=>{

    try {
        
    const {  id_registro ,asignatura,horas_dictadas,tema_dictado,num_estudiantes, observacion } = req.body

    const respuesta = await prisma.t_regis_asis.updateMany({

        where:{
            id_registro: id_registro
        },

        data:{
            observacion: observacion,
            num_estudiantes: num_estudiantes,
            tema_dictado: tema_dictado,
            horas_dictadas: horas_dictadas
        }
    })

    return respuesta.count
  

    } catch (error) {
       console.log(error) 
    }

    console.log(respuesta)
}


const eliminarRegistro = async(id)=>{


    console.log(id)
    try {
        
    const registroEliminado = await prisma.t_regis_asis.delete({
        where:{
            id_registro: parseInt(id)
        }
    })

    console.log(registroEliminado.id_docente)
    return registroEliminado

    } catch (error) {
        
    }

}

module.exports = {crearRegistro, informeAsistencia, verAsistencia, actualizarRegistro, eliminarRegistro}