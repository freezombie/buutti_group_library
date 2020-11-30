import { Button } from "rebass";
import { withContext } from "./AppContext";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

const Login = (props) => {
    const [onLoginPage, setOnLoginPage] = useState(true);
    const history = useHistory();

    const onFinish = (values) => {
        props.login(values)
            .then(() => {
                if(props.user) {
                    history.push("/");
                }
            })
    }
    const onFinishFailed = () => {
        console.log("On Finish failed");
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
        </div>
    )
}

export default withContext(Login);