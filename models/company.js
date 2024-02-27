// libreria que nos permitira conectarse a mongodb
//https://backendtiendavirtual.onrender.com/api/listCompanies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  nameCompany: { type: String, require: true },
  userCompany:{type:String},
  identifier:{type:Number,require:true},
  phone: { type: String, required: true },
  phone2: { type: String, required: false },
  address: { type: String, require: true },
  notesComp: { type: String, require: true },
  avatar: { type: String, required: false },
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  country:{type:String,require:true},
  cityName:{type:String,require:true},
  level:{type:Number,require:false},
  levelPay:{type:Boolean,require:false},//0=false = empresa que NO pago 
  status:{type:Boolean,default:true},
  siteWeb:{type:String,require:false},
  email:{type:String,required:false},
  branchOffice:[{type:String,require:false}],
  typeComp: { type: Number,required: true}, 
  codeInter: { type: String, required: false,unique:true }
})

module.exports = mongoose.model("Company", companySchema);
