'use strict'
const Turno =require("../models/turno")
const connectDB = require('../db')


module.exports = {
    Query: {

//turnoCount:()=>Turno.collection.countDocuments()        
getTurnos:async(root,args)=>{
    return Turno.find({})
}  
// getTurnos: async () => {

        //     let db
        //     let turnos = []
        //     try {
        //         db = await connectDB()
        //         turnos = await db.collection('turnos').find().toArray()
        //     } catch (error) {
        //         console.error(error)
        //     }
        //     return turnos
        // },

        // getTurno: (root, arg) => {
        //     const turno = turnos.filter(turno => turno.name === arg.name)
        //     return turno.pop()
        // }
    }
}