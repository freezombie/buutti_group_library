import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

export const newUser = async (req, res) => {
    const {
        name,
        email,
        role
    } = req.body;
    let { password } = req.body;
    // crypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
    const fundRequest = [];
    const user = {
        name,
        email,
        password,
        role,
        borrow_history: [],
        borrowed_books: []
    };
    const userData = new userModel(user);
    await userData.save();
    res.json(user);
};
