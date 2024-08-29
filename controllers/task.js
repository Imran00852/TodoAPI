import { Task } from "../models/task.js";
import { catchAsyncErrors } from "../utils/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

//create new task
export const createTask = catchAsyncErrors(async (req, res) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task created!",
  });
});

//get my tasks
export const myTasks = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.user;

  const tasks = await Task.find({ user: _id });
  res.status(200).json({
    success: true,
    tasks,
  });
});

//update task
export const updateTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) return next(new ErrorHandler("Task not found", 400));
  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: "true",
    message: "Task Updated !",
  });
});

//delete task
export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  if (!task) return next(new ErrorHandler("Task not found", 400));

  res.status(200).json({
    success: true,
    message: "Task Deleted!",
  });
});
