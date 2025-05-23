const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);