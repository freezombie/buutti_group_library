import "../App.css";
import { withContext } from "./AppContext";
import { useHistory } from "react-router-dom";
import { Tiles } from "@rebass/layout";
import React, { useState, useEffect } from "react";

const Profile = (props) => {
    const history = useHistory();
    const [borrowHistory, setBorrowhistory] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    if(!props.token){
        history.push("/");
    }

    useEffect(() => {
        setBorrowhistory(props.user.borrow_history);
        setBorrowedBooks(props.user.borrowed_books);
    },[]);

    console.log(borrowedBooks);
    return (
        <div>
            <p>{props.user.name}</p>
            <p>{props.user.email}</p>
            <Tiles columns={1, null , 1}>
                <div id="borrowhistory">
                    <p>borrowhistory</p>
                    <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date Borrowed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowHistory.map((book) =>
                            <React.Fragment>
                                <tr>
                                    <th>{book.title}</th>
                                    <th>{book.dateBorrowed.slice(8,10)}.{book.dateBorrowed.slice(5,7)}.{book.dateBorrowed.slice(0, 4)}</th>
                                </tr>
                            </React.Fragment>
                        )}
                    </tbody>
                    </table>
                </div>
                <div id="borrowedbooks">
                    <p>borrowedbooks</p>
                    <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date Borrowed</th>
                            <th>Date Returned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowedBooks.map((book) =>
                            <React.Fragment>
                                <tr>
                                    <th>{book.title}</th>
                                    <th>{book.dateBorrowed.slice(8,10)}.{book.dateBorrowed.slice(5,7)}.{book.dateBorrowed.slice(0, 4)}</th>
                                    <th>{book.dateReturn.slice(8,10)}.{book.dateReturn.slice(5,7)}.{book.dateReturn.slice(0, 4)}</th>
                                </tr>
                            </React.Fragment>
                        )}
                    </tbody>
                    </table>
                </div>
            </Tiles>

        </div>
    )
}

export default withContext(Profile);
