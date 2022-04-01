
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = mongoose.Schema({
   id: { type: String, required: true },
   foodName: { type: String },
   country: { type: String },
   foodImg: { type: String },
   subject: { type: String },
   ingredients: { type: Array },
   description: { type: Object }
});

module.exports = mongoose.model('Recipe', recipeSchema);

