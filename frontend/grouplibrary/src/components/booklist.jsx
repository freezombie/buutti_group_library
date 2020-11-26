import React, {useState, useEffect } from 'react';
import axios from "axios";
import img from "../JoyceUlysses2.jpg";
import { Tiles } from "@rebass/layout";
import Book from "./Book";

const URL = "http://localhost:5000";
const bookAxios = axios.create();


const BookList = (props) => {
  const { searchString } = props;
  const [bookData,setBookData] = useState([]);
  useEffect(() => {
    if(props){
      if(!props.searchString){
          bookAxios({
            method: "get",
            url: `${URL}/books`,
          }).then(response => {
            setBookData(response.data);
          });
      } else {
        console.log("search with string ", props.searchString);
      }
  }
  }, [searchString]);

  return(
    <Tiles columns={[1, null, 1]}
              bg="white">
                {bookData.map((book) =>{
                  book.img = img;
                  return(<Book data={book} />);
                })
              }
    </Tiles>
  
  )
}

export default BookList

        