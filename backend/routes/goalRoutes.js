const express = require('express')
const router = express.Router()
const { getGoals, setGoals, updateGoals, deleteGoals} = require('../controllers/goalController')

//routes

//GET goal 
//api/goals 
router.get('/', getGoals)


//POST goal 
//api/goals 
router.post('/', setGoals)

//PUT update goal 
//api/goals/id
router.put('/:id', updateGoals)

//DELETE goal 
//api/goals/id 
router.delete('/:id', deleteGoals)

module.exports = router