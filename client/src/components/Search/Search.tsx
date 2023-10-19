import { useState, FormEvent, useEffect } from "react";
import { Button, Input } from "@mui/material";
import {useAppDispatch} from "../../app/hooks.ts";
import {findThirdUser} from "../../dispatchers/users/usersThunks.ts";
import {clearGlobalUsers} from "../../dispatchers/users/usersSlice.ts";
import ClearIcon from '@mui/icons-material/Clear';
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
    };

    const clearUsers = () => {
        dispatch(clearGlobalUsers());
        setQuery('');
        setDebouncedQuery('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder={"Type a username (i.e. emmarrat)"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{width: '300px'}}
            />
            <Button type="button" onClick={clearUsers}> <ClearIcon/> Clear</Button>
        </form>
    );
};

export default Search;
