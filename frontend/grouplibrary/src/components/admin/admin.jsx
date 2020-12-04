import AddBook from "./addbook.jsx";
import React, {useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { withContext } from "../AppContext";
import { Box, Button } from "rebass";
import { Tiles } from "@rebass/layout";
import "./admin.css";

const Admin = (props) => {
    const [bookData,setBookData] = useState([]);
    const [customerData,setCustomerData] = useState([]);
    const [adminData,setAdminData] = useState([]);
    const [selectedBook, setSelectedBook] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const adminAxios = axios.create();
    const URL = "http://localhost:5000";
    const history = useHistory();

    if(props.token) {
        if(props.user.role!=="admin") {
            history.push("/");
        }
    } else if (!props.token || (props.user && props.user.role !== "admin")) {
        history.push("/");
    }

    useEffect(() => {
        adminAxios({
            method: "get",
            url: `${URL}/books`,
        }).then(response => {
            setBookData(response.data);
            setSelectedBook(response.data[0]);
        });
        adminAxios({
            method: "get",
            url: `${URL}/users/users/allusers`,            
        }).then(response => {
            setCustomerData(response.data.filter((user) => user.role==="customer" ));
            setAdminData(response.data.filter((user) => user.role==="admin" ));
            setSelectedUser(response.data[0]);
        });
    },[]);

    const addCopy = (e) => {
        e.preventDefault();
        adminAxios({
            method: "put",
            url: `${URL}/book`,
            data: {
                isbn: selectedBook.isbn,
                newCopies: [{ "status": "in_library" }]
            }
        }).then(response => {
            let updatedBook = selectedBook;
            //const newBook = {...selectedBook, response.data.copies}
            updatedBook.copies = response.data.copies;
            setSelectedBook(""); // en saanut tuota tekstiä muuttumaan enkä useeffectiä triggeröitymään ilman tätä :|
            setSelectedBook(updatedBook);
        });
    }

    const deleteBook = (e) => {
        adminAxios({
            method: "delete",
            url: `${URL}/book`,
            data: {
                isbn: selectedBook.isbn
            }
        }).then(response => {
            console.log(response);
        })
    }

    const handleChange = (e) => {
        if(e.target.name === "bookchoice") {
            setSelectedBook(bookData.find( ({ isbn }) => isbn === e.target.value));
        } else {
            const mergedArray = adminData.concat(customerData);
            setSelectedUser(mergedArray.find( ({ email }) => email=== e.target.value));
        }
    }

    const toggleAdmin = (e) => {
        e.preventDefault();
        const newRole = (selectedUser.role === "customer") ? "admin" : "customer";
        adminAxios({
            method: "put",
            url: `${URL}/users/changerole`,
            data: {
                email: selectedUser.email,
                newRole: newRole
            }
        }).then(response => {
            console.log(response);
            if(response.status = 200) {
                const updatedUser = {...selectedUser, role: newRole};
                setSelectedUser(updatedUser);
                if(newRole === "admin") {
                    const newCustomerData = customerData.filter(user => user.email !== updatedUser.email);
                    const newAdminData = [...adminData, updatedUser];
                    setCustomerData(newCustomerData);
                    setAdminData(newAdminData);
                } else {
                    const newAdminData = adminData.filter(user => user.email !== updatedUser.email);
                    const newCustomerData = [...customerData, updatedUser];
                    setAdminData(newAdminData);
                    setCustomerData(newCustomerData);
                }
            }
        });
    }

    return(
        <div>
            <p>Admin page</p>
            <AddBook />
            <Tiles columns={[1,null,2]}>
            <p>Books:</p>
            <p>Users</p>
            </Tiles>
            <Tiles columns={[2,null,4]}>
                <Box
                    as="form"
                    name="bookform">
                        <select name="bookchoice" onChange={handleChange} >
                            {bookData.map((book) =>
                                <option value={book.isbn}>{book.title}</option>
                            )}
                        </select><br />
                        <Button className="delete" my={2} onClick={deleteBook}>Delete Book</Button>
                        <Button className="add" mx={2} onClick={addCopy}>Add a copy</Button>
                </Box>
                <div id="selectedBook">
                    <p>Title: {selectedBook && selectedBook.title}</p>
                    <p>ISBN: {selectedBook && selectedBook.isbn}</p>
                    <p>Copies: {selectedBook && selectedBook.copies && selectedBook.copies.length}</p>
                    
                </div>
                <Box
                    as="form"
                    name="userform">
                        <select name="userchoice" onChange={handleChange}>
                            <optgroup label="Admins">
                                {adminData.map((admin) =>
                                    <option value={admin.email}>{admin.email}</option>
                                )}
                            </optgroup>
                            <optgroup label="Customers">
                                {customerData.map((customer) =>
                                    <option value={customer.email}>{customer.email}</option>
                                )}
                            </optgroup>
                        </select>
                        <Button className="delete" my={2}>Delete User</Button>
                        <Button className="add" mx={2} onClick={toggleAdmin}>{selectedUser && selectedUser.role === "customer" ? "Make Admin" : "Demote Admin"}</Button>
                </Box>
                <div id="selectedUser">
                    <p>Name: {selectedUser && selectedUser.name}</p>
                    <p>Email: {selectedUser && selectedUser.email}</p>
                    <p>Role: {selectedUser && selectedUser.role}</p>
                </div>
            </Tiles>
        </div>
    )
}

export default withContext(Admin);