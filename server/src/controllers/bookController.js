import { json } from "express";
import bookModel from "../models/bookModel.js";
import userModel from "../models/userModel.js";

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
    res.status(200).json(book);
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

export const modifyBook = async (req,res) => {
    const book = await bookModel.findOne({ isbn: req.body.isbn });
    if (!book) {
        return res.status(404).send(`No book found by ISBN ${req.body.isbn}`);
    }
    if("newCopies" in req.body)
    {
        if(req.body.newCopies.length > 0)
        {
            req.body.newCopies.forEach((copyInRequest) => {
                book.copies.push({
                    status: copyInRequest.status,
                    due: copyInRequest.due,
                    borrower_id: copyInRequest.borrower_id,
                    reserveList: copyInRequest.reserveList,
                });
            });
            await book.save();
        }
    }
    if(!"newInfo" in req.body) {
        return res.status(500).send("You must present us with some new info or a new copy");
    }
    const newInfo = req.body.newInfo;
    const modifiedBook = Object.assign(book, newInfo);
    const returnMsgBook = book.replaceOne(modifiedBook);
    res.status(200).json(returnMsgBook._update);
};

export const deleteBook = async (req, res) => {
    const book = await bookModel.findOne({ isbn: req.body.isbn });
    if (!book) {
        return res.status(404).send(`No book found by ISBN ${req.body.isbn}`);
    }
    if(!("copy_id" in req.body))
    {
        console.log("Trying to delete with ISBN: ", req.body.isbn);
        const operation =
        await bookModel.deleteOne({ isbn: req.body.isbn });
        if(operation.deletedCount === 1) {
            return res.status(200).send(`Book by ISBN: ${req.body.isbn} deleted succesfully`);
        } else {
            return res.status(500).send("Something went wrong!");
        }
    } else if ("copy_id" in req.body) {
        console.log(req.body.copy_id);
        book.copies.id(req.body.copy_id).remove();
        await book.save()
        return res.status(200).send(`Removed copy (if it existed) by _id: ${req.body.copy_id}`);
    } else {
        return res.status(500).send("something went wrong");
    }
}

export const reserveBook = async(req, res) => {
    const book = await bookModel.findOne({ isbn: req.body.isbn });
    if (!book) {
        return res.status(404).send(`No book found by ISBN ${req.body.isbn}`);
    }
    const user = await userModel.findOne({ _id: req.body.reserverId });
    if (!user) {
        return res.status(404).send(`No user found by ID: ${req.body.reserverId}`);
    }
    const copy = book.copies.id(req.body.copy_id);
    if (!copy) {
        return res.status(404).send(`No copy found by ID: ${req.body.copy_id}`);
    }
    const reservation = { reserverId: req.body.reserverId }; 
    const newReserveList = [...copy.reserveList, reservation];
    copy.reserveList = newReserveList;
    await book.save();
    return res.status(200).send("Reservation made");
}
