import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bookModel from "../models/bookModel.js";

let emailChek;

const checkEmail = async (email) => {
    emailChek = await userModel.findOne(
        { email },
    );
    console.log("result of email check");
    if (!emailChek) {
        return (!emailChek);
    }
    console.log("Email found, try a different email");
};

export const loginUser = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email }, (err, res) => {
        if (err) {
            return res.status(500).send("Failed while finding user");
        }
        if (!res) {
            return res.status(403).send("User ID incorrect");
        }
    });

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(403).send("Password incorrect");
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET);
    return res.send({ token, user: user.toObject(), success: true });
};

export const newUser = async (req, res) => {
    const {
        name,
        email,
        role,
        password,
    } = req.body;
    checkEmail(email);
    // crypt the password
    if (!emailChek) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            name,
            email,
            password: hashedPassword,
            role,
            borrow_history: [],
            borrowed_books: [],
        };
        const userData = new userModel(user);
        await userData.save();
        const token = jwt.sign(user, process.env.SECRET);
        user.password = req.body.password; 
        return res.status(201).send({
            success: true, user, token,
        });

    }
};

export const allUsers = async (req, res) => {
    const users = await userModel.find();
    res.json(users);
    console.log("searching users");
};

export const editUser = async (req, res) => {
    const {
        email,
        newName,
        newPassword,
    } = req.body;

    const user = await userModel.findOne(
        { email },
    );
    if (user) {
        const bool = bcrypt.compareSync(req.body.password, user.password);
        if (bool) {
            if (!newName.replace(/\s/g, "").length) {
                console.log("Name only contains whitespace (ie. spaces, tabs or line breaks)");
            } else if (newName) {
                user.name = newName;
                console.log("Name Changed");
            }
            if (!newPassword.replace(/\s/g, "").length) {
                console.log("Password only contains whitespace (ie. spaces, tabs or line breaks)");
            } else if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                user.password = hashedPassword;
                console.log("New passwor saved");
            }
            const userData = new userModel(user);
            await userData.save();
            res.json(user);
        } else {
            console.log("password error");
            return res.status(500).send("wrong password.");
        }
    } else {
        console.log("wrong user name or password");
        return res.status(500).send("wrong user name or password.");
    }
};

export const removeUser = async (req, res) => {
    const userDelete =
       await userModel.deleteOne({ email: req.body.email });
    // await userModel.deleteMany();
    if (userDelete.deletedCount === 1) {
        return res.status(200).send(`User: ${req.body.email} deleted succesfully`);
    }
    return res.status(500).send("User doesn't exist.");
};

export const borrowBook = async (req, res) => {
    const book = await bookModel.findOne({ isbn: req.body.isbn });
    const user = await userModel.findOne({ email: req.body.email });
    // let copy = JSON.stringify(book.copies);
    if (user && book) {
        const copy = book.copies.find(copy => copy.status === "in_library");

        if (copy){
        const borrowDate = new Date();
        const returnDate = new Date();
        returnDate.setDate(60);
        console.log("borrow book!!!");

        user.borrowed_books.push( {
            isbn: book.isbn,
            title: book.title,
            copyID: copy._id,
            dateBorrowed: borrowDate,
            dateReturn: returnDate,
        });

        user.borrow_history.push( {
            title: book.title,
            dateBorrowed: borrowDate,
        });
 
        await user.save();

        copy.status = "borrowed";
        bookModel.updateOne(book, copy.status, (err,obj) => {
            book.save();
            if (err) throw err;
            console.log("copy statues changed to borrowed");
        }); 

        res.status(201).json(user.borrowed_books);

        console.log(book);
        console.log(user);
        console.log("Borrow date " + borrowDate);
        console.log("return date " + returnDate);

    } else  {
        console.log("all books gone");
        res.status(404).json("No books available at the moment");
        }
       
    } else {
        console.log("No user or book found");
    }
};

export const returnBook = async (req, res) => { 
const user = await userModel.findOne({ email:req.body.email });
const book = await bookModel.findOne({ isbn: req.body.isbn });
const isbn = book.isbn;

if (user) {

    let borrowedBook = await user.borrowed_books.find((borrowedBook) => borrowedBook.isbn === isbn);
    const id = borrowedBook.copyID;
    
    if (borrowedBook) { 
            await bookModel.findOneAndUpdate(id, book.copies, {status: "in_library"}, (err,obj) => {  
            console.log(book.copies);
            book.save();
            if (err) throw err;
            console.log("copy statues changed to in_library");
        }); 
     
        user.borrowed_books.remove(borrowedBook.copyID;
        await user.save();
     
        if (user.removeCount === 1) {
            console.log("book returned");
        }else {
            console.log("A mistake has happened in returning the book. try again");
        }

        } else {
            res.status(200).json("No such book FOUND!!!");
    }
}

}