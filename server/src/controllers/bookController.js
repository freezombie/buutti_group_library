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

export const modifyBook = async (req,res) => {
    const book = await bookModel.findOne({ isbn: req.body.isbn });
    if (!book) {
        return res.status(404).send(`No book found by ISBN ${req.body.isbn}`);
    }
    if(!"newInfo" in req.body) {
        return res.status(500).send("You must present us with some new info");
    }
    const newInfo = req.body.newInfo;
    const modifiedBook = Object.assign(book, newInfo);
    const returnMsgBook = book.replaceOne(modifiedBook);
    res.status(200).json(returnMsgBook._update);
};
