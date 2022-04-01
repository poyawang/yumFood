
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = mongoose.Schema({
   id: { type: String, required: true },
   foodName: { type: String },
   foodImg: { type: String },
   subject: { type: String },
   price: { type: String },
   location: { type: String },
   size: { type: String }
});

module.exports = mongoose.model('Shop', shopSchema);

