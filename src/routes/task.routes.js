const express = require('express');
const router = express.Router();
const task = require('../models/task');

router.get('/', async (req, res) => {

  const tasks = await task.find();
  console.log(tasks);
  res.json(tasks);
});

//Get an specific task whit its id
router.get('/:id', async (req, res) => {
  const myTask = await task.findById(req.params.id);
  res.json(myTask);

})

//Create  Task
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const newTask = new task({title, description});
  await newTask.save();
  console.log(req.body);
  res.json({status: "Task saved"});
});


//Edit a Task
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const newTask = {title, description};
  await task.findByIdAndUpdate(req.params.id, newTask);
  res.json({status: "Task Updated"});
});

//Delete a Task
router.delete('/:id', async (req, res) => {
  await task.findByIdAndRemove(req.params.id);
  res.json({status: "Task Eliminated"});
});


module.exports = router;
