import express from "express";
import {
    newUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/users/add", newUser);
// router.post("/users/edit", editUser);

export default userRouter;
