import React from 'react';
import DashList from '../DashList/DashList';
import SearchBar from '../SearchBar/SearchBar';
import classes from  './DashHomePage.module.css';

export default function DashHomePage(props) {
    return (
        <div className={classes.wrapper}>
            <SearchBar search={props.search} />
            <DashList bins={props.bins} coupons={props.coupons} searchValue={props.searchValue} 
            delete={props.delete} edit={props.edit} editObject={props.editObject} isCoupon={props.isCoupon}/>
        </div>
    )
}