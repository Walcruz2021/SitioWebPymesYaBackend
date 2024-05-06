require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
let connection

const{
    DB_USER,
    DB_PASSWORD
}=process.env
const mongoUrl=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.b5p91.mongodb.net/EmpresaWalter?retryWrites=true&w=majority`

//const mongoUrl=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.b5p91.mongodb.net/EmpresaWalterPreProduccion?retryWrites=true&w=majority`
//const mongoUrl=""
// async function connectDB() {
//     if (connection) return connection
//     let client
//     try {
//         client=await mongoose.connect(mongoUrl, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false
//         });
//  //connection=client.db(DB_NAME)
//     } catch (error) {
// console.error("could no connection",mongoUrl,error)
// process.exit(1)
//     }
//     return connection
// }

const connectDB=mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//useFindAndModify: false para solucionar 
// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});


module.exports = connectDB