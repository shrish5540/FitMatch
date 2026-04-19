const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { checkIn, getStreak,getLeaderboard } = require('../controllers/streakController')

router.post('/checkin', protect, checkIn)
router.get('/streak', protect, getStreak)
router.get('/leaderboard', protect, getLeaderboard)

module.exports = router