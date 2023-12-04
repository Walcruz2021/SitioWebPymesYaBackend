// libreria que nos permitira conectarse a mongodb
//https://backendtiendavirtual.onrender.com/api/listCompanies
const mongoose = require("mongoose");
const { Schema } = mongoose;

// const noteSchema = new Schema({
//   title: { type: String, required: false },
//   paragraph:{type:String,required:false}
// }) COMO ESET MODELO ES DINAMICO YA QUE LOS CAMPOS VARIAN SEGUN EL DATO ENVIADO ENTONCES SE DEJA EL SCHEMMA 
//VACIO DE LA SIGUIENTE MANERA

const noteSchema = new Schema({
    title1: String,
    title2: String,
    title3: String,
    title4: String,
    title5: String,
    paragraph1: String,
    paragraph2: String,
    paragraph3: String,
    paragraph4: String,
    paragraph5: String,
    paragraph6: String,
    paragraph7: String,
    paragraph8: String,
    paragraph9: String,
    paragraph10: String,
    paragraph11: String,
    paragraph12: String,
    paragraph13: String,
    paragraph14: String,
    paragraph15: String,
    paragraph16: String,
    paragraph17: String,
    paragraph18: String,
    paragraph19: String,
    paragraph20: String,
    paragraph21: String,
    paragraph22: String,
    paragraph23: String,
    paragraph24: String,
    paragraph25: String,

    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    img6: String,
    img7: String,
    image:String,
    avatar: { type: String, required: false },
    typeNote:String
  });

module.exports = mongoose.model("Note", noteSchema);
