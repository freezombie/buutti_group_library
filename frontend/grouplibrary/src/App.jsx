import { Flex, Box, Image, Text } from "rebass";
import { Tiles } from "@rebass/layout";
import { Label, Input, Radio } from "@rebass/forms";
import React, {useState} from "react";
import BookList from "./components/booklist.jsx";
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
            px={7}
            py={3}
            width={1}
            height={100}
            color='black'
            bg='red'>
              
            <Flex
              width={1}
              px={3}
              color='white'
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

      <div className="body">
        <Box
          px={7}
          py={2}
          fontSize={2}
          width={[ 1, 1 ]}
          color='black'
          bg='blue'>

          <Tiles columns={[1, null, 2]} px={3}>
            <Flex>
              <Label p={2}>
                <Radio color='black'
                  name='option'
                  id='title'
                  value='title'
                  defaultChecked
                />Title
              </Label>
              <Label p={2}>
                <Radio color='black'
                  name='option'
                  id='author'
                  value='author'
                />Author
              </Label>
              <Label p={2}>
                <Radio color='black'
                  name='option'
                  id='isbn'
                  value='isbn'
                />ISBN
              </Label>
            </Flex>
            <Flex>
              <Input
              id='Search'
              name='search'
              type='search'
              placeholder='Search for titles, authors, isbns'
              bg='white'
              />
            </Flex>
          </Tiles>
            <BookList />
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
