// libreria que nos permitira conectarse a mongodb
//https://backendtiendavirtual.onrender.com/api/listCompanies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
  nameCompany:{type:String,required:true},
  fullName: { type: String, required: false },
  email:{type:String,required: false},
  phone: { type: String, required: true },
  phone2: { type: String, required: false },
  address: { type: String, required: false },
  noteService: { type: String, required: false },
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  country:{type:String,require:true},
  cityName:{type:String,require:true},
  levelPay:{type:Boolean,require:false},//0=false = empresa que NO pago 
  siteWeb:{type:String,require:false},
  condition:{type:Boolean},
  level:{type:Number}
})

module.exports = mongoose.model("Service", serviceSchema);
