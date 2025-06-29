
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'Unknown' },
  grade: { type: String, default: 'Unknown' },
  subject: { type: String, default: 'Unknown' },
  series: { type: String, default: 'Unknown' },
  price: { type: String, default: 'Unknown' },
  imagePath: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);

