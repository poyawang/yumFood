
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sequenceSchema = mongoose.Schema({
  maxRecipeId: { type: String },
  maxShopId: { type: String },
});

module.exports = mongoose.model('Sequence', sequenceSchema);
