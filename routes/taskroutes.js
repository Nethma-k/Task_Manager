const express = require('express');
const router = express.Router();
const auth = require('../middleware/Auth');
const Task = require('../models/Task');

router.post('/test',auth, (req, res) => {
    res.json({
        message:'Task routes are working!',
        user: req.user
    })
});

router.post('/', auth, async(req,res) => {
    try{
        const task= new Task({
            ...req.body,
            owner: req.user._id
        });
    

        await task.save();
        res.status(201).send({ task, message:"Task created successfully" });

    }
        


    catch (err) {
        res.status(400).send({ error: err });
    }
});

router.get('/', auth, async(req,res) => {
    try{
        const task = await Task.find()
        res.status(200).send({task, count: task.length, message: "Tasks Fetched Successfully" });

    }
        


    catch (err) {
        res.status(500).send({ error: err });
    }
});

router.get('/:id',auth, async(req,res) => {

    const taskID= req.params.id;

    try{
        const task = await Task.findOne({
            _id: taskID,
        });
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({task, message: "Task Fetched Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
})

router.patch('/:id', auth, async(req,res) => {

    const taskID= req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['Task','Description', 'Assignees'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({error: "Invalid Updates"});
    }

    try{
      const task = await Task.findOne({
            _id: taskID,
            owner: req.user._id
      });

        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        res.json({
            message: "Task Updated Successfully",
        })
    }
    catch(err){
        res.status(500).send({error: err});
    }
})
router.delete('/:id', auth , async (req,res)=>{
    const taskID = req.params.id;

    try{
        const task = await Task.findOneAndDelete({
            _id: taskID,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({task, message: "Task Deleted Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
})
module.exports= router;
