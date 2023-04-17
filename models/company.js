// libreria que nos permitira conectarse a mongodb
//https://backendtiendavirtual.onrender.com/api/listCompanies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  nameCompany: { type: String},
  identifier: { type: Number},
  phone: { type: String},
  email: { type: String},
  address: { type: String},
  notesComp: { type: String},
  avatar: { type: String, required: false},
  hourAtention: { type: String, required: false },
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  typeCategory: { type: String, required: false },
  // president: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Client',
  //   nameClient: String
  // },
  country: { type: String, required: true },
  cityName: { type: String, required: true },
  level: { type: Number},
  status: { type: Boolean},
  siteWeb: { type: String},
  //1 sera empresa 2 sera Profesional,..etc
  typeComp: { type: Number}, 
  codeInter: { type: String, required: false,unique:true }, //identificacion de cada empresa (será unico)
});

module.exports = mongoose.model("Company", companySchema);
