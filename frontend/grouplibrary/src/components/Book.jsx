import { Tiles } from "@rebass/layout";

function Book (props) {
    console.log(props.data);
    const { isbn, title, author, img, published, description} = props.data;
    const year = published.slice(0, 4);
    const month = published.slice(6,7);
    const day = published.slice(9,10);
    return(
        <Tiles columns={1, null , 2}>
            <img src={img} />
            <div>
                <h1>{title}</h1>
                <h2>{author}</h2>
                <h3>{day}.{month}.{year}</h3>
                <p><b>ISBN:</b> {isbn}</p>
                <p><b>Description:</b> {description}</p>
            </div>
        </Tiles>
    );
}

export default Book
