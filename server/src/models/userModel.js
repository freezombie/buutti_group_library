import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    borrow_history: [],
    borrowed_books: [],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
