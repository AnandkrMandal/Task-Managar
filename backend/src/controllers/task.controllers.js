import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//add Task
const addTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user._id;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }
   
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const newTask = await Task.create({ title, description, user: userId });

    if(!newTask){
        throw new ApiError(500, "Something went wrong while adding task");
    }

    return res.status(201).json(
        new ApiResponse(201, newTask, "Task created successfully")
    );

});


//get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    return res.status(200).json(
        new ApiResponse(200, tasks, tasks.length > 0 ? "Tasks fetched successfully" : "No tasks found")
    );

});


//get single task by id
const getTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    try {
        const task = await Task.findById(taskId)
    
        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        if (task.user.toString() !== userId.toString()) {
            throw new ApiError(403, "You are not authorized to view this task");
        }
    
        return res.status(200).json(
            new ApiResponse(200, task, "Task fetched successfully")
        );

    } catch (error) {
        throw new ApiError(503, "Internal Server Error",error);
    }

});

//complete task
const completeTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    try {
        const task = await Task.findById(taskId);
    
        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        if (task.user.toString() !== userId.toString()) {
            throw new ApiError(403, "You are not authorized to update this task");
        }
         
        task.completed = true;
        const updatedTask = await task.save();

        return res.status(200).json(
            new ApiResponse(200, updatedTask, "Task completed successfully")
        );


    } catch (error) {
        throw new ApiError(503, "Internal Server Error", error);
    }

});


const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    const { title, description } = req.body;

   try {
     const task = await Task.findById(taskId);
 
     if (!task) {
         throw new ApiError(404, "Task not found");
     }
 
     if (task.user.toString() !== userId.toString()) {
         throw new ApiError(403, "You are not authorized to update this task");
     }
 
     task.title = title || task.title;
     task.description = description || task.description;
 
     const updatedTask = await task.save();
 
     return res.status(200).json(
         new ApiResponse(200, updatedTask, "Task updated successfully")
     );

   } catch (error) {
    throw new ApiError(503, "Internal Server Error",error);
   }
});



//delete task
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    try {
        const task = await Task.findById(taskId);
    
        if (!task) {
            throw new ApiError(404, "Task not found");
        }
    
        if (task.user.toString() !== userId.toString()) {
            throw new ApiError(403, "You are not authorized to delete this task");
        }
    
        await task.deleteOne();
    
        return res.status(200).json(
            new ApiResponse(200, null, "Task deleted successfully")
        );

    } catch (error) {
        throw new ApiError(503, "Internal Server Error",error);
    }

});


export { addTask, getAllTasks, getTaskById, completeTask, updateTask, deleteTask };