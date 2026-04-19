const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { swipeUser,getMatches, getSuggestedUsers } = require('../controllers/swipeController')


router.get('/matches', protect, getMatches)
router.get('/suggested', protect, getSuggestedUsers)
router.post('/:id', protect, swipeUser)

module.exports = router