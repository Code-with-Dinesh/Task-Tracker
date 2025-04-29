const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
  });

const Project = mongoose.model('Project', projectSchema);
module.exports =  Project;
