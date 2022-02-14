import React from 'react';
import DashItem from '../DashItem/DashItem'
import classes from './DashList.module.css'

export default function DashList(props) {
    function eachItem(item, i) {
        const editing = item._id === props.editObject ? { editing: true } : {};
        return <DashItem key={i} index={item._id} 
            delete={props.delete} edit={props.edit}
            {...item} {...editing} isCoupon={props.isCoupon} />
    }

    let items = props.isCoupon ? props.coupons : props.bins;
    items = props.searchValue ?
        items.filter(
            item =>
                (props.isCoupon && item.name.toLowerCase().includes(props.searchValue.toLowerCase()))
                || (!props.isCoupon && item.type.toLowerCase().includes(props.searchValue.toLowerCase()))
                || (item._id === props.searchValue)
        )
        : items;

    return (
        <div className={classes.list}>
            {(items && items.length > 0) ?  items.map(eachItem) : "There's no items to show."}
        </div>
    )
}