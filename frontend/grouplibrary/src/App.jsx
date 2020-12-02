import { Box } from "rebass";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookList from "./components/booklist.jsx";
import SearchBar from "./components/SearchBar.jsx";
// import { BrowserRouter as Link } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar.jsx";
import Profile from "./components/profile.jsx";
import Login from "./components/login.jsx";
import Admin from "./components/admin/admin.jsx"

function App() {
    const [searchString, setSearchString] = useState("");
    const [searchOption, setSearchOption] = useState("");
  return (
    <div className="Page">
        <Router>
            <header>
                <NavBar />
            </header>
            <div className="App">
                <Switch>
                    <Route exact path="/" render={() => (
                        <div>
                            <div className="searchbar">
                                <Box
                                px={7}
                                py={2}
                                fontSize={2}
                                color='black'>
                                    <SearchBar modifySearchString={setSearchString} modifySearchOption={setSearchOption}/>
                                </Box>
                            </div>      
                            <div className="content">
                                <Box 
                                px={7}
                                py={3}
                                color='black'>      
                                <BookList searchString={searchString} searchOption={searchOption} />
                                </Box>
                            </div>
                        </div>
                    )} />
                    <Route exact path="/profile" render={() => (
                        <Profile />
                    )} />
                    <Route exact path="/login" render={() => (
                        <Login />
                    )} />
                    <Route exact path="/admin" render={() => (
                        <Admin />
                    )} />
                </Switch>
            </div>
        </Router>
        <footer>
            <Box
            p={5}
            fontSize={4}
            width={[ 1, 1 ]}
            color='black'>
            </Box>
        </footer>
      </div>
  );
}

export default App;
