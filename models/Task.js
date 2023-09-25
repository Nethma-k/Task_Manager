const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
   Task: {type: String, required:true},
   Description: {type: String, required:true},
   Assignees:{type:String, required:true},
   owner:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  }
});



const Task = mongoose.model('Task', taskSchema);
module.exports = Task;