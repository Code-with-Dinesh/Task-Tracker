const projectModel = require("../models/PorjectSchema")
const userModel  = require("../models/UserSchema")


exports.project = async function (req, res) {
  try {
    const { name,userId } = req.body;
    console.log(name,userId)
    const user = await userModel.findById(req.userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.projects.length >= 4) {
      return res.status(400).json({ error: 'Maximum 4 projects allowed' });
    }

    const project = new projectModel({ name, user: user._id });
    await project.save();

    user.projects.push(project._id);
    await user.save();

    return res.status(201).json(project);
  } catch (err) {
    console.error('Error while creating project:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
