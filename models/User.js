const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  readBooks: [
    {
      openLibraryId: String,
      title: String,
      author: String,
      coverImage: String,
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);