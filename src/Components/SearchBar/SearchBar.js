import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs'
import classes from './SearchBar.module.css';

export default function SearchBar(props) {
    const [searchValue, setSearchValue] = useState("");

        return (
            <div style={{
                display: "flex",
                columnGap: "9px"
            }}>
                <input type="text" name="search-bar" id="search-bar" onChange={e => setSearchValue(e.target.value)}
                    className={`${classes.search} overflow-text`} placeholder='🔎︎ Search by id / name / type' />
                <button className='btn-round' onClick={() => props.search(searchValue)}><BsSearch /></button>
            </div>
        );
}