import SearchIcon from '@mui/icons-material/Search';
import "./SearchBar.css";
import {useState} from "react";

const SearchBar = ({onSearch}) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (event) => {
        const text = event.target.value;
        setSearchValue(text);
        onSearch(text);
    }

    return (
        <div className="search-bar">
            <SearchIcon/>
            <input type="text" placeholder="Szukaj..." value={searchValue} onChange={handleSearch}/>
        </div>
    );
}

export default SearchBar;