import { json } from "express";
import bookModel from "../models/bookModel.js";

export const newBook = async (req, res) => {
    const {
        isbn,
        title,
        author,
        published,
        pages,
        description,
    } = req.body;
    const Book = bookModel;
    const book = new Book({
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
    if ("isbn" in req.body) {
        getBook(req, res);
    }
    if("author" in req.body) {
        const matches = await bookModel.find({ author: { $regex: req.body.author, $options: "i" } });
            if(Object.entries(matches).length === 0) {
                return res.status(404).send("No matches found");
            }
            return res.json(matches);
    }
};

export const getBook = async (req, res) => {
    const book = await bookModel.findOne({ isbn: req.body.isbn });
    if (!book) {
        return res.status(404).send(`No book found by ISBN ${req.body.isbn}`);
    }
    return res.json(book);
};

// Alla olveassa jostain syystä pakko olla req, muuten ei toimi.
export const getBooks = async (req, res) => {
    const books = await bookModel.find();
    return res.json(books);
};
