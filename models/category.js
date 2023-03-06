const mongoose = require('mongoose')
const { Schema } = mongoose


const categoryShema = new Schema({
  name: { type: String, require: false },
  logo: {type:String, require:false}
})

module.exports = mongoose.model('Category', categoryShema)
