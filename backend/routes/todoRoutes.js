const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getTodos, setTodos, updateTodos, deleteTodos } = require('../controllers/todoController')

//routes

//GET goal 
//api/goals 
router.get('/', protect, getTodos)

//POST goal 
//api/goals 
router.post('/', protect, setTodos)

//PUT update goal 
//api/goals/id
router.put('/:id', protect, updateTodos)

//DELETE goal 
//api/goals/id 
router.delete('/:id', protect, deleteTodos)



module.exports = router