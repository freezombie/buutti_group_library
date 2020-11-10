import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    published: Date,
    pages: Number,
    description: String,
    copies: [copySchema],
});
//Subdocument of bookSchema.
const copySchema = new mongoose.Schema({
    status: String,
    due: Date,
    borrower_id: Number,
    reserveList: { reserverId: Number },
});

const bookModel = mongoose.model("book", bookSchema);

export default bookModel;
