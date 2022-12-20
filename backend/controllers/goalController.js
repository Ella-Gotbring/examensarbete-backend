const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

//get goals
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
  
    res.status(200).json(goals)
  })

//set goal
const setGoals = asyncHandler(async (req, res) => {

    if (!req.body.text) {
      res.status(400)
      throw new Error('add a text field')
    }
  
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
      
    })
  
    res.status(200).json(goal)
  })

//update goals 
const updateGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
      }

      //check user
      const user = await User.findById(req.user.id)
      if(!user){
          res.status(401)
          throw new Error('User nor found, cant update')

      }

      //only logged in users can update their own goals
      if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }


      const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })

    res.status(200).json(updatedGoal)
})

//delete goals 
const deleteGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
      res.status(400)
      throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
      if(!user){
          res.status(401)
          throw new Error('User nor found, cant update')

      }

      //only logged in users can update their own goals
      if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }

  await goal.remove()

  res.status(200).json({ id: req.params.id })

    
})



module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}