import express from "express";
import {
    // function names
    newBook,
    getBook,
    modifyBook,
    deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBook);
// router.get("/search", searchBook);
// router.post("/reserve", reserveBook);
router.post("/", newBook);
router.put("/", modifyBook);
router.delete("/", deleteBook);

export default router;
