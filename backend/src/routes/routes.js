import { Router } from "express";
import { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
} from "../controllers/user.controllers.js";

import {
     addTask,
     getAllTasks, 
     getTaskById, 
     completeTask, 
     updateTask, 
     deleteTask
} from "../controllers/task.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured auth routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(verifyJWT, refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)

// task routes

router.route("/tasks").post(verifyJWT, addTask)
router.route("/tasks").get(verifyJWT, getAllTasks)
router.route("/tasks/:id").get(verifyJWT, getTaskById)
router.route("/tasks/:id").patch(verifyJWT, updateTask)
router.route("/tasks/:id").delete(verifyJWT, deleteTask)
router.route("/tasks/:id/complete").patch(verifyJWT, completeTask)

export default router;