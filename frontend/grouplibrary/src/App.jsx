import { Flex, Box, Image, Text } from "rebass";
import React, {useState} from "react";
import BookList from "./components/booklist.jsx";
import SearchBar from "./components/SearchBar.jsx";
// import { BrowserRouter as Link } from "react-router-dom";
import "./App.css";

function App() {
    const [searchString, setSearchString] = useState("");
    const [searchOption, setSearchOption] = useState("");
  return (
    <div className="App">
      <header>
        <Flex>
          <Box
            p={3}
            width={1}
            height={100}
            color='black'
            bg='red'>
              
            <Flex
              px={2}
              color='white'
              bg='black'
              alignItems='center'>
              <Text p={2} fontWeight='bold'>Rebass</Text>
              <Box mx='auto' />
              <p>Profile</p>
            </Flex>
          </Box>
        </Flex>
      </header>

      <div className="body">
        <Box
          p={3}
          fontSize={4}
          width={[ 1, 1 ]}
          color='black'
          bg='blue'>

          <SearchBar modifySearchString={setSearchString} modifySearchOption={setSearchOption}/>
          <BookList searchString={searchString} searchOption={searchOption} />
          </Box>
      </div>

      <footer>
        <Box
          p={5}
          fontSize={4}
          width={[ 1, 1 ]}
          color='black'
          bg='green'>
          footer
        </Box>
      </footer>
    </div>
  );
}

export default App;
