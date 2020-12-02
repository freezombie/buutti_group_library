import { Flex, Box, Text } from "rebass";
import { withContext } from "./AppContext";
import React, { Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const NavBar = (props) => {
    const goToFrontPage = () => {
        window.location = "/";
    }

    return (
        <Flex>
            <Box
              px={7}
              py={3}
              width={1}
              height={100}
              color='black'>
                
              <Flex
                width={1}
                px={3}
                color='gold'
                bg='black'
                alignItems='center'>
                <Link to="" onClick = { goToFrontPage }>
                    <Text p={1} fontWeight='bold'>Group D Library</Text>
                </Link>
                
                <Box width={1} />
                {props.token && props.user.role === "admin" && <Link to="/admin">
                    <Text p={1} fontWeight='bold'>Admin</Text>
                </Link>}
                {!props.token && <Link to="/login">
                    <Text p={1} fontWeight='bold'>Signup/Login</Text>
                </Link>}
                {props.token && <Link to="/" onClick = { props.logout }>
                    <Text p={1} fontWeight='bold'>Logout</Text>
                </Link>}               
                <Box width={11} />
                {props.token && <Link to="/profile">
                    <Text p={3} fontWeight='bold'>Profile</Text>
                </Link>}
              </Flex>
            </Box>
          </Flex>
    )
}

export default withContext(NavBar);