import { useState, FormEvent, useEffect } from "react";
import { Button, Input } from "@mui/material";
import {useAppDispatch} from "../../app/hooks.ts";
import {findThirdUser} from "../../dispatchers/users/usersThunks.ts";

const Search = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            if (!debouncedQuery) return;
            dispatch(findThirdUser(debouncedQuery))
        };

        fetchData();
    }, [debouncedQuery]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(findThirdUser(debouncedQuery))
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder={"Type a username (i.e. burakorkmez)"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit">Search</Button>
        </form>
    );
};

export default Search;
