const User = require('../models/User')

const checkIn = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const lastCheckIn = user.lastCheckIn ? new Date(user.lastCheckIn) : null

    if (lastCheckIn) {
      lastCheckIn.setHours(0, 0, 0, 0)

      const diffDays = (today - lastCheckIn) / (1000 * 60 * 60 * 24)

      if (diffDays === 0) {
        return res.status(400).json({ message: 'Already checked in today' })
      } else if (diffDays === 1) {
        user.streak += 1
      } else {
        user.streak = 1
      }
    } else {
      user.streak = 1
    }

    user.lastCheckIn = today
    await user.save()

    res.status(200).json({ message: 'Check-in successful', streak: user.streak })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.status(200).json({ streak: user.streak })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('name streak')
      .sort({ streak: -1 })

    res.status(200).json({ leaderboard: users })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { checkIn, getStreak ,getLeaderboard}