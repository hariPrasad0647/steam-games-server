// models/allGames.model.js
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  gameName: String,
  steamLink: String,
  releaseData: String,
  developer: String,
  publisher: String,
  gameTrailer: String,
  genere: [String],
  screenshots: [String]
});
module.exports = mongoose.model('AllGame', schema, 'allGames'); // 'allGames' is collection name
