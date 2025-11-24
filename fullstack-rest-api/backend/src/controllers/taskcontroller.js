import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    res.json(task);
};

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
};
