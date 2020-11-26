import mongoose from "mongoose";

const borrowedBooks = new mongoose.Schema({
    isbn: String,
    title: String,
    copyID: String,
    dateBorrowed: Date,
    dateReturn: Date,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    borrow_history: [{}],
    borrowed_books: [borrowedBooks],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
