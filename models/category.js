const mongoose = require('mongoose')
const { Schema } = mongoose


const categoryShema = new Schema({
  name: { type: String, require: true }
})

module.exports = mongoose.model('Category', categoryShema)
