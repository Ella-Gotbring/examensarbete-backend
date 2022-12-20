const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getGoals, setGoals, updateGoals, deleteGoals} = require('../controllers/goalController')

//routes

//GET goal 
//api/goals 
router.get('/', protect, getGoals)

//POST goal 
//api/goals 
router.post('/', protect, setGoals)

//PUT update goal 
//api/goals/id
router.put('/:id', protect, updateGoals)

//DELETE goal 
//api/goals/id 
router.delete('/:id', protect, deleteGoals)



module.exports = router