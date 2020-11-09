import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    borrow_history: [],
    borrowed_books: [],
});

const customerModel = mongoose.model(
    "customer", customerSchema);

export default customerModel;
