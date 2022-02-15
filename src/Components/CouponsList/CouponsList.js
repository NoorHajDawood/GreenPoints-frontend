import React, { useState, useEffect } from 'react';
import Coupon from '../Coupon/Coupon';
import classes from './CouponsList.module.css'

function CouponsList(props) {
   
    const eachCoupon = () => {
        if(!props.coupons || props.coupons.length === 0) {
            return 'There is no coupons to show';
        }
        return props.coupons.map((coupon, index) => {
            return <Coupon key={index} 
                name={coupon.name} 
                info={coupon.info}  
                code={coupon.code} 
                cost={coupon.cost}
                imgUrl={coupon.imgUrl}
                id={coupon._id}
                updatePoints={props.updatePoints}/>
        })
    }

    return (
        <div className={classes.container}>
            {eachCoupon()}
        </div>
    )
}

export default CouponsList;