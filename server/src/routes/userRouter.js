import express from "express";
import {
    newUser, allUsers, editUser, removeUser, borrowBook,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/users/add", newUser);
userRouter.get("/users/allusers", allUsers);
userRouter.put("/users/edit", editUser);
userRouter.delete("/users/delete", removeUser);
userRouter.put("/users/borrow", borrowBook);

export default userRouter;
