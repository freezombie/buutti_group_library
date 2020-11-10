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