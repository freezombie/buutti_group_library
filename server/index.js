import express from "express";
import mongoose from "mongoose";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
import authRouter from "./src/routes/authRouter.js";
import bookRouter from "./src/routes/bookRouter.js"
import { getBooks } from "./src/controllers/bookController.js";
import userRouter from "./src/routes/userRouter.js";
import cors from "cors";

dotenv.config();

const requestLogger = (req, res, next) => {
    console.log(`METHOD: ${req.method}`);
    console.log(`PATH: ${req.path}`);
    console.log("BODY: ", req.body);
    console.log("-----");
    next();
};

const app = express();
const mongoUrl = "mongodb://localhost:27017/libraryDB"; 

const connectMongoose = async () => {
    await mongoose.connect(
        mongoUrl,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
};

connectMongoose();
app.use(express.json());

const router = express.Router();
router.get("/", getBooks);

app.use(requestLogger);
app.use(cors());
app.use("/book/", bookRouter);
app.use("/books/", router);
app.use("/users/", userRouter);
app.use("/users", authRouter);
app.use("/api", expressJwt({secret: process.env.SECRET, algorithms: ["HS256"]}));

app.listen(5000, () => {
    console.log("listening to port 5000");
});
