const projectModel = require("../models/PorjectSchema");
const TaskModel = require("../models/TaskSchema");


exports.task = async function (req, res) {
  try {
    const { title, description } = req.body;
    const { projectId } = req.params;

    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const task = new TaskModel({ title, description });
    await task.save();

    project.tasks.push(task._id);
    await project.save();

    res.status(201).json(task);
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.readtask = async function (req, res) {
  const { projectId } = req.params;
  const project = await projectModel.findById(projectId).populate("tasks");
  res.json(project.tasks);
};

exports.updatetask = async function (req, res) {
  try {
    const { projectId } = req.params;
    console.log(projectId);
    const { title, description, status } = req.body;
    console.log(title, description, status);
    const task = await TaskModel.findById(projectId);
    console.log(task);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    if (status === "Completed") {
      task.completedAt = new Date();
    }
    await task.save();

    res.json(task);
  } catch (error) {
    console.log("error while updating", error);
  }
};

exports.deleteTask = async function (req,res) {
    const { projectId } = req.params;
    const deletetask = await TaskModel.findByIdAndDelete(projectId);
    console.log(deletetask)
   res.json({ message: 'Task deleted' });
}


