const asyncHandler = require('express-async-handler')

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
const updateGoals = (req, res) => {
    res.status(200).json({message: `updated goal ${req.params.id}`})
}

//delete goals 
const deleteGoals = (req, res) => {
    res.status(200).json({message: `deleted goal ${req.params.id}`})
}



module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}