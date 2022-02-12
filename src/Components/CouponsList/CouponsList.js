import React, { useState, useEffect } from 'react';
import Coupon from '../Coupon/Coupon';
import classes from './CouponsList.module.css'

function CouponsList(props) {

    return (
        <div className={classes.container}>
            <Coupon/>
        </div>
    )
}

export default CouponsList;