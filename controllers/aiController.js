const Groq = require('groq-sdk')
const User = require('../models/User')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const getWorkoutPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user.workoutPlan) {
      return res.status(200).json({ workoutPlan: user.workoutPlan })
    }

    const prompt = `Create a weekly workout plan for someone with goal: ${user.goal} and fitness level: ${user.fitnessLevel}. Be specific and structured.`

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }]
    })

    const workoutPlan = response.choices[0].message.content

    user.workoutPlan = workoutPlan
    await user.save()

    res.status(200).json({ workoutPlan })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getDietPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user.dietPlan) {
      return res.status(200).json({ dietPlan: user.dietPlan })
    }

    const prompt = `Create a daily diet plan for someone with height: ${user.height}cm, weight: ${user.weight}kg and goal: ${user.goal}. Be specific with meals and portions.`

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }]
    })

    const dietPlan = response.choices[0].message.content

    user.dietPlan = dietPlan
    await user.save()

    res.status(200).json({ dietPlan })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const askCoach = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const { question } = req.body

    if (!question) {
      return res.status(400).json({ message: 'Question is required' })
    }

    const prompt = `You are a fitness coach. Here is the user's profile:
    - Goal: ${user.goal}
    - Fitness Level: ${user.fitnessLevel}
    - Gym Type: ${user.gymType}
    - Height: ${user.height}cm
    - Weight: ${user.weight}kg
    
    User question: ${question}
    
    Give a helpful, specific answer based on their profile.`

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }]
    })

    const answer = response.choices[0].message.content

    res.status(200).json({ answer })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { getWorkoutPlan, getDietPlan , askCoach}