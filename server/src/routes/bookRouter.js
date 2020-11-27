import express from "express";
import {
    // function names
    newBook,
    searchBook,
    getBook,
    modifyBook,
    deleteBook,
    reserveBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBook);
router.post("/search", searchBook);
router.post("/reserve", reserveBook);
router.post("/", newBook);
router.put("/", modifyBook);
router.delete("/", deleteBook);

export default router;
