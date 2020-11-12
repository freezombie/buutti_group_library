import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

export const newUser = async (req, res) => {
    const {
        name,
        email,
        role,
        password,
    } = req.body;
    // crypt the password
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
        }
    } else {
        console.log("wrong user name or password");
    }
};
