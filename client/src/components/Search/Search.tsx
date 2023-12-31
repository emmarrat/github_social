import React, { useState, FormEvent, useEffect } from 'react';
import { Button, Input } from '@mui/material';
import { useAppDispatch } from '../../app/hooks.ts';
import { findThirdUser } from '../../dispatchers/users/usersThunks.ts';
import {
  clearGlobalUsers,
  pageOne,
} from '../../dispatchers/users/usersSlice.ts';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  page: number;
}
const Search: React.FC<Props> = ({ page }) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return;
    const fetchData = async () => {
      dispatch(findThirdUser({ name: debouncedQuery, page: page.toString() }));
    };

    fetchData();
  }, [debouncedQuery, page, dispatch]);

  useEffect(() => {
    if (query.length === 0) {
      clearUsers();
    }
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const clearUsers = () => {
    dispatch(clearGlobalUsers());
    setQuery('');
    setDebouncedQuery('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    dispatch(pageOne());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder={'Type a username (i.e. emmarrat)'}
        value={query}
        onChange={handleInputChange}
        sx={{ width: '300px' }}
      />
      <Button type="button" onClick={clearUsers}>
        {' '}
        <ClearIcon /> Clear
      </Button>
    </form>
  );
};

export default Search;
