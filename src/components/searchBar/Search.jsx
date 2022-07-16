import './search.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
const Search = ({ posts, setShowPosts }) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
        setShowPosts(() => {
            const items = [];
            posts.forEach((element) => {
                if (String(element.title).toLowerCase().includes(search.toLowerCase()))
                    items.push(element);
            });
            return items;
        });
    }, [search]);
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    return (
        <div className="search-container">
            <div className="search-group">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearchChange(e)}
                    className="search-input"
                    placeholder="Search"
                />
                <button className="search-button">
                    <SearchIcon className="search-icon" />
                </button>
            </div>
        </div>
    );
};

export default Search;
