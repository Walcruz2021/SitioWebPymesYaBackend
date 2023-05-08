const mongoose = require('mongoose')
const { Schema } = mongoose


const activeShema = new Schema({
  name: { type: Schema.Types.Mixed, require: false },
  
})

module.exports = mongoose.model('ActiveIngredient', activeShema)
