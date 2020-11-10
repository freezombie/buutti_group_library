import express from "express";
import mongoose from "mongoose";
import accountRouter from "./routes/libraryrouter.js";

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

app.get("/", (req, res) => {
    res.send("test, hello");
});

app.use(requestLogger);
app.use("/customers/", customersRouter);
app.use("/books/", booksRouter);

app.listen(5000, () => {
    console.log("listening to port 5000");
});
