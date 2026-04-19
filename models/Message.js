const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)