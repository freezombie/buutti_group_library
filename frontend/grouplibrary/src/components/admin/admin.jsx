import AddBook from "./addbook.jsx";
import React, {useState, useEffect } from 'react';
import axios from "axios";

const Admin = (props) => {
    const [bookData,setBookData] = useState([]);
    const adminAxios = axios.create();
    const URL = "http://localhost:5000";
    
    useEffect(() => {
        adminAxios({
            method: "get",
            url: `${URL}/books`,
        }).then(response => {
            setBookData(response.data);
        });
    },[]);
    
    return(
        <div>
            <p>Admin page</p>
            <AddBook />
        </div>
    )
}

export default Admin;