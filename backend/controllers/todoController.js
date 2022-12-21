const asyncHandler = require('express-async-handler')
const Todo = require('../model/todoModel')
const User = require('../model/userModel')

//get goals
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Goal.find({ user: req.user.id })
  
    res.status(200).json(todos)
  })

//set goal
const setTodos = asyncHandler(async (req, res) => {

    if (!req.body.text) {
      res.status(400)
      throw new Error('add a text field')
    }
  
    const todo = await Todo.create({
      text: req.body.text,
      user: req.user.id,
      
    })
  
    res.status(200).json(todo)
  })

//update goals 
const updateTodos = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
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
      if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }


      const updatedGoal = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })

    res.status(200).json(updatedGoal)
})

//delete goals 
const deleteTodos = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
      res.status(400)
      throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
      if(!user){
          res.status(401)
          throw new Error('User nor found, cant update')

      }

      //only logged in users can update their own goals
      if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }

  await todo.remove()

  res.status(200).json({ id: req.params.id })

    
})



module.exports = {
    getTodos, setTodos, updateTodos, deleteTodos
}