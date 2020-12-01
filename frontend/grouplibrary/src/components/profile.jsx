import "../App.css";
import { withContext } from "./AppContext";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
    const history = useHistory();
    console.log(props.user);
    if(!props.token){
        history.push("/");
    }
    return (
        <div>
        <p>{props.user.name}</p>
        <p>{props.user.email}</p>
        </div>
    )
}

export default withContext(Profile);