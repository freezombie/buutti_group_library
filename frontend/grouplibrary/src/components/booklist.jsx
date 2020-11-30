import React, {useState, useEffect } from 'react';
import axios from "axios";
import img from "../JoyceUlysses2.jpg";
import { Tiles } from "@rebass/layout";
import Book from "./Book";

const URL = "http://localhost:5000";
const bookAxios = axios.create();


const BookList = (props) => {
    const { searchString, searchOption } = props;
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
                // ettei haeta ihan hirveen pienillä hauilla.
                if(props.searchString.length < 3) {
                    return;
                }
                // alla olevat varmaan voi jotenkin yhdistää silleen että dataan syötetään title,author,isbn kohdalle searchoption.
                if(props.searchOption === "author") {
                    bookAxios({
                        method: "post",
                        url: `${URL}/book/search`,
                        data: { author: props.searchString }
                    }).then(response => {
                        console.log("author search");
                        console.log(response.data);
                        setBookData(response.data);
                    });
                } else if (props.searchOption === "title") {
                    bookAxios({
                        method: "post",
                        url: `${URL}/book/search`,
                        data: { title: props.searchString }
                    }).then(response => {
                        console.log("title search");
                        console.log(response.data);
                        setBookData(response.data);
                    });
                } else if (props.searchOption === "isbn") {
                    bookAxios({
                        method: "post",
                        url: `${URL}/book/search`,
                        data: { isbn: props.searchString }
                    }).then(response => {
                        console.log("author search");
                        console.log(response.data);
                        setBookData([response.data]);
                    });
                }
                console.log("search with string ", props.searchString);
                console.log("search with option ", props.searchOption);
            }
        }
    }, [searchString, searchOption]);

    return(
        <div>
            <Tiles columns={[1, null, 1]}
                bg="white">
                {   bookData.map((book) =>{
                    book.img = img;
                    return(<Book data={book} />);
                    })
                }
            </Tiles>
        </div>
    )
}

// Mikko's stuff commented out (these were after booklist):
/* <Tiles columns={[2, null, 4]} py={2}>
                <Image src={img} height={140} width={95}/>
                <Text paddingRight={280}>bookData</Text>
            </Tiles>

            <Tiles columns={[2, null, 4]} py={2}>
                <Image src={img} height={140} width={95}/>
                <Text paddingRight={280}>bookData</Text>
            </Tiles>

            <Tiles columns={[2, null, 4]} py={2}>
                <Image src={img} height={140} width={95}/>
                <Text paddingRight={280}>bookData</Text>
            </Tiles>
*/

export default BookList

        