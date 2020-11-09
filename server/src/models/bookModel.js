import { stringify } from "json5";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    isbn: String,
    name: String,
    author: String,
    description: String,
    copy_id: [],
});

const bookModel = mongoose.model(
    "book", bookSchema);

export default bookModel;
