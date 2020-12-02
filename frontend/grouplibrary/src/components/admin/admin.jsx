import AddBook from "./addbook.jsx";
import React, {useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { withContext } from "../AppContext";

const Admin = (props) => {
    const [bookData,setBookData] = useState([]);
    const adminAxios = axios.create();
    const URL = "http://localhost:5000";
    const history = useHistory();

    if(props.token) {
        if(props.user.role!=="admin") {
            history.push("/");
        }
    } else if (!props.token) {
        history.push("/");
    }

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

export default withContext(Admin);