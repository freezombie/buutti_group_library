import bcrypt from "bcrypt";
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
        res.json(user);
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
        //const copy = await bookModel.findOne({ status: book.copies.status === "in_library" });
        const copy = book.copies.find(copy => copy.status === "in_library");
        const borrowDate = new Date();
        const returnDate = new Date();
        returnDate.setDate(60);
        console.log("borrow book!!!");
        const borrowed_books = {
            isbn: book.isbn,
            title: book.title,
            copyID: copy,
            dateBorrowed: borrowDate,
            dateReturn: returnDate,
        };
        
        copy.status ="borrowed";

        await userModel.updateOne(user, borrowed_books, (err, obj) => {
            if (err) throw err;
            console.log("book borrowed");
            bookModel.updateOne(book, copy.status, (err,obj) => {
           // bookModel.updateOne(book, copy);    
                if (err) throw err;
                console.log("copy statues changed to borrowed");
            });  

        });
        res.status(201).json(borrowed_books);

        console.log(book);
        console.log(user);
        console.log("Borrow date " + borrowDate);
        console.log("return date " + returnDate);
    } else {
        console.log("No user or book found");
    }
};

export const returnBook = async (req, res) => { 
const user = await userModel.findOne({ email: req.body.email });
const bookISBN = req.body.isbn;
if (user) {
const book = user.borrowed_books.findOneAndRemove(book => book.isbn === bookISBN);
res.status(201).json("Borrowed book returned");

}


}
