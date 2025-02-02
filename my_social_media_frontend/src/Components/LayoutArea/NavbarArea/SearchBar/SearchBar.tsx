import "./SearchBar.css";
import {Search, Clear} from "@mui/icons-material";
import userService from "../../../../Services/UserService.ts";
import {useEffect, useState} from "react";
import {User} from "../../../../Models/User.ts";
import {useNavigate} from "react-router-dom";

export function SearchBar(): JSX.Element {

    const [query, setQuery] = useState<string>('');
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    function searchUsers(query: string) {
        setLoading(true);

        userService.searchUsers(query)
            .then((res) => {
                setSearchResult(res);
                setLoading(false);
            })
            .catch((err) => {
                alert(err.response.data);
                setLoading(false);
            });
    }

    function handleUserClick(userName: string) {
        navigate(`/user/${userName}`);
        setQuery('');
        setSearchResult([]);
    }

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const trimmedQuery = query.trim();
            if (trimmedQuery) {
                searchUsers(trimmedQuery);
            } else {
                setSearchResult([]);
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [query]);


    return (
        <div className="searchBar">
            <Search className={"searchIcon"} />
            <input
                placeholder={"Search for friend, post or video"}
                className={"searchInput"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
                <Clear
                    className="clearIcon"
                    onClick={() => setQuery('')}
                />
            )}

            {loading && <div className="loadingSpinner">Loading...</div>}

            {query && searchResult.length > 0 && (
                <div className="searchResults">
                    <ul>
                        {searchResult.map((user) => (
                            <li key={user.id} onClick={()=>handleUserClick(user.userName)}>
                                {user.firstName} {user.lastName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {query && searchResult.length === 0 && (
                <div className="noResults">
                    No results found
                </div>
            )}
        </div>
    );
}
