const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { getWorkoutPlan , getDietPlan,askCoach} = require('../controllers/aiController')

router.get('/workout', protect, getWorkoutPlan)
router.get('/diet', protect, getDietPlan)
router.post('/ask',protect,askCoach)
module.exports = router