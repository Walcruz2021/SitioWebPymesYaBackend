// libreria que nos permitira conectarse a mongodb
//https://backendtiendavirtual.onrender.com/api/listCompanies
const mongoose = require('mongoose')
const { Schema } = mongoose

const companySchema = new Schema({
  nameCompany: { type: String, require: true },
  identifier:{type:Number,require:true},
  phone: { type: Number, require: true },
  address: { type: String, require: true },
  notesComp: { type: String, require: true },
  Category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  // president: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Client',
  //   nameClient: String
  // },
  country:{type:String,require:true},
  cityName:{type:String,require:true},
  level:{type:Number,require:false},  
  status:{type:Boolean,default:true}
})

module.exports = mongoose.model('Company', companySchema)
