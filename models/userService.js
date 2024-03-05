// libreria que nos permitira conectarse a mongodb
//https://backendtiendavirtual.onrender.com/api/listCompanies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userServiceSchema = new Schema({
  fullName:{ type: String, required: true },
  // phone: { type: String, required: true },
  // phone2: { type: String, required: false },
  //address: { type: String, require: true },
  //country:{type:String,require:true},
  //cityName:{type:String,require:true},
  status:{type:Boolean,default:true},
  email:{type:String,required:false},  
})

module.exports = mongoose.model("userService", userServiceSchema);
