import { json } from "express";
import bookModel from "../models/bookModel.js";

export const newBook = async (req, res) => {
    const { isbn, title, author, published, pages, description } = req.body;
    const Book = bookModel;
    const book = new Book ({
        isbn,
        title,
        author,
        published,
        pages,
        description,
    });
    req.body.copies.forEach((copyInRequest) => {
        book.copies.push({
            status: copyInRequest.status,
            due: copyInRequest.due,
            borrower_id: copyInRequest.borrower_id,
            reserveList: copyInRequest.reserveList,
        });
    });
    await book.save();
    res.json(book);
}

export const searchBook = async (req, res) => {
    if("title" in req.body) {
            const matches = await bookModel.find({ title: { $regex: req.body.title, $options: "i" } });
            if(Object.entries(matches).length === 0) {
                return res.status(404).send("No matches found");
            }
            return res.json(matches);
    }
}