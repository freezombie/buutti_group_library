import { Box, Button } from "rebass";
import { withContext } from "./AppContext";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Label, Input } from "@rebass/forms";

const Login = (props) => {
    const [onLoginPage, setOnLoginPage] = useState(true);
    const history = useHistory();

    const onFinish = (e) => {
        e.preventDefault();
        let userInfo = {
            [e.target[0].name]: e.target[0].value,
            [e.target[1].name]: e.target[1].value
        };
        console.log(userInfo);
        if(onLoginPage) {            
            props.login(userInfo)
                .then(() => {
                    if(props.user) {
                        history.push("/profile");
                    }
                })
        } else {
            userInfo = {
                ...userInfo,
                [e.target[2].name]: e.target[2].value
            };
            props.signup(userInfo)
                .then(() => {
                    if(props.user) {
                        history.push("/profile");
                    }
                })
        }
    }

    

    const switchMode = () => {
        setOnLoginPage(!onLoginPage);
    }

    return ( 
        <div>
            { onLoginPage ?
                <Button onClick={switchMode}>Switch to signup</Button> :
                <Button onClick={switchMode}>Switch to login</Button>
            }
            <Box
                as="form"
                onSubmit={onFinish}
                py={3}>
                    { !onLoginPage &&
                        <Box width={1} px={2}>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Erkki Esimerkki" 
                            />
                        </Box>
                    }
                    <Box width={1} px={2}>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="erkki@esimerkki.com"
                        />
                    </Box>
                    <Box width={1} px={2}>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password"
                            name="password"
                            type="password"
                        />
                    </Box>
                    <Box px={2} ml="auto">
                        <Button>Submit</Button>
                    </Box>
                </Box>            
        </div>
    )
}

export default withContext(Login);