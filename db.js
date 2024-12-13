require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
let connection

const{
    DB_USER,
    DB_PASSWORD
}=process.env
const mongoUrl=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.b5p91.mongodb.net/EmpresaWalter?retryWrites=true&w=majority`

const connectDB=mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});


module.exports = connectDB