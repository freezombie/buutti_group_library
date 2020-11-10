import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    isbn: String,
    name: String,
    author: String,
    description: String,
    copies: [copySchema],
});
//Subdocument of bookSchema.
const copySchema = new mongoose.Schema({
    id: Number,
    status: String,
    due: Date,
    borrower_id: Number,
    reserveList: { reserverId: Number },
});

const bookModel = mongoose.model("book", bookSchema);

export default bookModel;
