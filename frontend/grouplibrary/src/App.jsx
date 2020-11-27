import { Flex, Box, Text } from "rebass";
import React, {useState} from "react";
import BookList from "./components/booklist.jsx";
import SearchBar from "./components/SearchBar.jsx";
// import { BrowserRouter as Link } from "react-router-dom";
import "./App.css";

function App() {
    const [searchString, setSearchString] = useState("");
    const [searchOption, setSearchOption] = useState("");
  return (
    <div className="Page">
      <div className="App">
        <header>
          <Flex>
            <Box
              px={7}
              py={3}
              width={1}
              height={100}
              color='black'>
                
              <Flex
                width={1}
                px={3}
                color='gold'
                bg='black'
                alignItems='center'>
                <Text p={1} fontWeight='bold'>Group D Library</Text>
                <Box width={1} />
                <Text p={1} fontWeight='bold'>Signup</Text>
                <Box width={11} />
                <Text p={3} fontWeight='bold'>Profile</Text>
              </Flex>
            </Box>
          </Flex>
        </header>

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

        <footer>
          <Box
            p={5}
            fontSize={4}
            width={[ 1, 1 ]}
            color='black'>
            
          </Box>
        </footer>
      </div>
    </div>
  );
}

export default App;
