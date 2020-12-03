import { Box, Button } from "rebass";
import { Label, Input, Textarea } from "@rebass/forms";
import { Tiles } from "@rebass/layout";
import { useState } from "react";
import axios from "axios";

const AddBook = (props) => {
    const addBookAxios = axios.create();
    const [statusMessage, setStatusMessage] = useState("");
    const URL = "http://localhost:5000";
    
    const onFinish = (e) => {
        e.preventDefault();
        addBookAxios({
            method: "post",
            url: `${URL}/book`,
            headers: { "Content-Type": "application/json" },
            data: {
                [e.target[0].name]: e.target[0].value,
                [e.target[1].name]: e.target[1].value,
                [e.target[2].name]: e.target[2].value,
                [e.target[3].name]: e.target[3].value,
                [e.target[4].name]: e.target[4].value,
                [e.target[5].name]: e.target[5].value,
                copies: [
                    {
                        status: "in_library",
                        reserveList: []
                    }
                ]
            }
        })
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    setStatusMessage("Added succesfully");
                } else {
                    setStatusMessage("Something went wrong");
                }
            })
    }

    const onChange = () => {
        setStatusMessage("");
    }

    return(
        <div>
            <p>Add Book:</p>
            <Box
                as="form"
                onSubmit={onFinish}
                py={3}>
                    <Tiles columns={[1,null,2]}>
                        <Box width={1} px={2}>
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input
                                id="isbn"
                                name="isbn"
                                type="text"
                                placeholder="9783161484100 / 3161484100"
                                required
                                onChange={onChange}
                            />
                        </Box>
                        <Box width={1} px={2}>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Title of the book"
                                required
                                onChange={onChange}
                            />
                        </Box>
                        <Box width={1} px={2}>
                            <Label htmlFor="author">Author</Label>
                            <Input 
                                id="author"
                                name="author"
                                type="text"
                                placeholder="Author of the book"
                                required
                                onChange={onChange}
                            />
                        </Box>
                        <Box>
                            <Label htmlFor="published">Published</Label>
                            <Input 
                                id="published"
                                name="published"
                                type="date"
                                required
                                onChange={onChange}
                            />
                        </Box>
                        <Box width={1} px={2}>
                            <Label htmlFor="pages">Pages</Label>
                            <Input 
                                id="pages"
                                name="pages"
                                type="number"
                                placeholder="100"
                                required
                                onChange={onChange}
                            />
                        </Box>
                        <Box width={1} px={2}>
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description"
                                name="description"
                                placeholder="Description of the book"
                                onChange={onChange}
                            />
                        </Box>
                        <Box px={2} ml="auto">
                            <Button>Submit</Button>
                        </Box>
                        {statusMessage && <p>{statusMessage}</p>}
                    </Tiles>
                </Box>                
        </div>
    )
}

export default AddBook;