require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
let connection

const{
    DB_USER,
    DB_PASSWORD,
    EMPRESAWALTER
}=process.env


//const mongoUrl=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.b5p91.mongodb.net/EmpresaWalter?retryWrites=true&w=majority`
const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@cluster0-shard-00-00.b5p91.mongodb.net:27017,cluster0-shard-00-01.b5p91.mongodb.net:27017,cluster0-shard-00-02.b5p91.mongodb.net:27017/${EMPRESAWALTER}?ssl=true&replicaSet=atlas-rjqw2o-shard-0&authSource=admin&appName=Cluster0`;

const connectDB=mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

const dns = require('dns');

dns.resolveSrv('_mongodb._tcp.cluster0.b5p91.mongodb.net', (err, res) => {
  console.log(err, res);
});


module.exports = connectDB