import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(task);
  } catch(err){ res.status(500).json({ message: "Server error", error: err.message }); }
};

export const getTasks = async (req, res) => {
  try {
    // Return tasks for the logged-in user
    const tasks = await Task.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch(err){ res.status(500).json({ message: "Server error", error: err.message }); }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Not found" });
    if (task.createdBy.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch(err){ res.status(500).json({ message: "Server error", error: err.message }); }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Not found" });
    if (task.createdBy.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    await Task.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch(err){ res.status(500).json({ message: "Server error", error: err.message }); }
};
