import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const InputSearch = props => {
    const {searchKey, setSearchKey, onKeyUp, onClickSearch} = props;
    
    return (
        <Paper
            elevation={5}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}
        >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search...' }}
            value={searchKey}
            onChange={(e) => {setSearchKey(e.target.value)}}
            onKeyUp={onKeyUp}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onClickSearch}>
            <SearchIcon />
        </IconButton>
        </Paper>
    );
}

export default InputSearch;