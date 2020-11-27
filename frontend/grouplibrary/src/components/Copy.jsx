import { Button } from "rebass";

function Copy (props) {
    if(props.data.status === 'in_library') {
        // alla olevasta tottakai poistetaan näkyvistä tuo props.data._id, se on nyt vaan sitä varten että näkee että kyseessä on eri kopiot.
        return (
        <div className="Copy">
        <p>Kopio {props.data._id} kirjastossa</p>
        <Button>Lainaa</Button>
        </div>
        );
    } else {
        return ("");
    }
}

export default Copy;