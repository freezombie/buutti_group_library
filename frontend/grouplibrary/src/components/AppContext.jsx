import axios from "axios";
import React, { Component } from "react";

const userAxios = axios.create();
const AppContext = React.createContext();
const URL = "http://localhost:5000";

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export class AppContextProvider extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            borrowed_books: [],
            borrow_history: []
        }
    }

    signup = (userInfo) => {
        return userAxios({
            method: "post",
            url: `${URL}/users/users/new`, // tälleen tuo oli backendissä... Pitäs varmaan olla /users/new.
            headers: { "Content-Type": "application/json"},
            data: {
                name: userInfo.name,
                password: userInfo.password,
                email: userInfo.email,
                role: "customer"
            }
            // roleen userInfo.role sitten kun on ylipäätään olemassa admin joka vois lisäillä admineita.
        })
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                this.setState({
                    user,
                    token
                });
                return response;
            }, (error) => {
                console.log(error);
            })
    }

    login = (userInfo) => {
        return userAxios({
            method: "post",
            //url: `${URL}/ user login path,
            headers: { "Content-Type": "application/json"},
            data: {
                email: userInfo.id,
                password: userInfo.password
            }
        })
            .then(response => {
                const { user, token } = response.data
                // borrowed_books, borrow_history = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user));
                this.setState({
                    user,
                    token
                    // borrowed_books, borrow_history
                });
                console.log("Login function ran succesfully");
                return response;
            }, (error) => {
                console.log(error);
            })
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState({
            user: {},
            token: "",
            borrowed_books: [],
            borrow_history: []
        })
    }

    borrowBook = (userInfo) => {
        return userAxios({
            method: "put",
            url: `${URL}/users/users/borrow`, // korjaa sitten kun backendi on korjattu.
            headers: { "Content-Type": "application/json"},
            data: {
                email: userInfo.id,
                isbn: "", // mitä kautta tieto tuleekaan
            }
        })
    }

    reserveBook = (userInfo) => {
        return userAxios({
            method: "post",
            url: `${URL}/book/reserve`, // korjaa sitten kun backendi on korjattu.
            headers: { "Content-Type": "application/json"},
            data: {
                reserverId: userInfo.id,
                isbn: "", // mitä kautta tieto tuleekaan
                copy_id: "" // mitä kautta tieto tuleekaan
            }
        })
    }

    returnBook = (userInfo) => {
        return userAxios({
            method: "post",
            url: `${URL}/users/users/borrow`, // korjaa sitten kun backendi on korjattu.
            headers: { "Content-Type": "application/json"},
            data: {
                email: userInfo.id,
                isbn: "", // mitä kautta tieto tuleekaan
            }
        })
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    borrowBook: this.borrowBook,
                    reserveBook: this.reserveBook,
                    returnBook: this.returnBook,
                    ...this.state
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export const withContext = Component => {
    return props => {
        return (
            <AppContext.Consumer>
                {
                    globalState => {
                        return (
                            <Component
                                {...globalState}
                                {...props}
                            />
                        )
                    }
                }
            </AppContext.Consumer>
        )
    }
}