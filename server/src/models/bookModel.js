import mongoose from "mongoose";

//Subdocument of bookSchema.
const copySchema = new mongoose.Schema({
    status: String,
    due: Date,
    borrower_id: Number,
    reserveList: [{reserverId: String }],
});
const bookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    published: Date,
    pages: Number,
    description: String,
    copies: [copySchema],
});

const bookModel = mongoose.model("book", bookSchema);

export default bookModel;
