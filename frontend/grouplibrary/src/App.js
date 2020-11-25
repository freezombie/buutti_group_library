import { Flex, Box, Image, Text } from "rebass";
import { Tiles } from "@rebass/layout";
import { Label, Input, Radio } from "@rebass/forms";
import React from "react";
// import { BrowserRouter as Link } from "react-router-dom";
import img from "./JoyceUlysses2.jpg";
import "./App.css";

function App() {
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

          <Tiles columns={[1, null, 2]}>
            <Flex>
              <Label>
                <Radio
                  name='option'
                  id='author'
                  value='author'
                />Author
              </Label>
              <Label>
                <Radio
                  name='option'
                  id='title'
                  value='title'
                />Title
              </Label>
              <Label>
                <Radio
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
              />
            </Flex>
          </Tiles>
        
          <Tiles width={[96, null, 128]}
                bg="white">
            <Image src={img} />
            <p>test</p>
          </Tiles>
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
