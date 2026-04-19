const Message = require('../models/Message')

const getChatHistory = async (req, res) => {
  try {
    const { matchId } = req.params

    const messages = await Message.find({ matchId })
      .sort({ createdAt: 1 })
      .populate('senderId', 'name')

    res.status(200).json({ messages })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getChatHistory }