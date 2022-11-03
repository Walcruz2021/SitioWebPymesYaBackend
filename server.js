//mongodb+srv://walter:<password>@cluster0.b5p91.mongodb.net/test
// Import npm packages
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
//const {graphql,buildSchema, SchemaMetaFieldDef}=require('graphql')
//const {makeExecutableSchema}=require('graphql-tools')
//const {graphqlHTTP}=require('express-graphql')
const {readFileSync}=require('fs')
const {join}=require('path')      
//const resolvers=require("./lib/resolvers")
const connect=require("./db")
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3002; // Step 1

const routes = require('./routes/api');

connect

// const schema=buildSchema(
//     readFileSync(
//         join(__dirname,'lib','schema.graphql'),'utf-8'
//         )
//     )

// const typeDefs=readFileSync(
    
//         join(__dirname,'lib','schema.graphql'),'utf-8'
        
//     )


//const schema=makeExecutableSchema({typeDefs,resolvers})


//useFindAndModify: false para solucionar 
// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated



// Data parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
// }


// HTTP request logger
app.use(morgan('tiny'));
// app.use('/api',graphqlHTTP({
//     schema:schema,
//     rootValue:resolvers,
//     graphiql:true
// }))
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));