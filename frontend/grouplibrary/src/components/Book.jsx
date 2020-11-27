import { Flex, Image } from "rebass";
import { Tiles } from "@rebass/layout";
import { Button } from "rebass";
import img from "../placeholder-img.png";
import "./book.css";

function Book (props) {
    const { isbn, title, author, img, published, description} = props.data;
    const year = published.slice(0, 4);
    const month = published.slice(6,7);
    const day = published.slice(9,10);
    const availableCopies = props.data.copies.filter(copy => copy.status==="in_library");

    return(
    <div className="book">
        <Tiles columns={1, null , 2}>
            <Image src={img} />
            <div>
                <h1>{title}</h1>
                <h2>{author}</h2>
                <h3>{day}.{month}.{year}</h3>
                <p><b>ISBN:</b> {isbn}</p>
                <p><b>Description:</b> {description}</p>
            </div>
        </Tiles>
        <Flex className="reserveArea">
            <p><b>Total copies: </b> {props.data.copies.length}</p>
            <p><b>Copies available:</b> {availableCopies.length}</p>
            <Button>{availableCopies !== 0 ? "Loan" : "Reserve"}</Button>
        </Flex>
    </div>
    );
}

export default Book
