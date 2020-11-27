import { Flex } from "rebass";
import { Tiles } from "@rebass/layout";
import { Label, Input, Radio } from "@rebass/forms";

const SearchBar = (props) => {
    function handleChange(e) {
        if(e.target.name === "search") {
            props.modifySearchString(e.target.value);
        } else if (e.target.name === "option") {
            props.modifySearchOption(e.target.value);
        }
    }

    return(
        <Tiles columns={[1, null, 2]}>
            <Flex onChange={handleChange}>
                <Label py={2}>
                    <Radio color='black'
                    name='option'
                    id='author'
                    value='author'
                    />Author
                </Label>
                <Label py={2}>
                    <Radio color='black'
                    name='option'
                    id='title'
                    value='title'
                    />Title
                </Label>
                <Label py={2}>
                    <Radio color='black'
                    name='option'
                    id='isbn'
                    value='isbn'
                    />ISBN
                </Label>
            </Flex>
            <Flex>
                <Input
                    id='Search'
                    name='search'
                    type='search'
                    placeholder='Search by author, title, isbn'
                    bg='white'
                    onChange={handleChange}
                />
            </Flex>
        </Tiles>
    )
}

export default SearchBar;