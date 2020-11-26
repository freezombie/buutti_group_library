import { Flex } from "rebass";
import { Tiles } from "@rebass/layout";
import { Label, Input, Radio } from "@rebass/forms";

const SearchBar = (props) => {
    function handleChange(e) {
        props.modifySearchString(e.target.value);
    }

    return(
        <Tiles columns={[1, null, 2]}>
            <Flex>
                <Label>
                    <Radio
                    name='option'
                    id='author'
                    value='author'
                    />Author
                </Label>
                <Label>
                    <Radio
                    name='option'
                    id='title'
                    value='title'
                    />Title
                </Label>
                <Label>
                    <Radio
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
                    placeholder='Search for titles, authors, isbns'
                    onChange={handleChange}
                />
            </Flex>
        </Tiles>
    )
}

export default SearchBar;