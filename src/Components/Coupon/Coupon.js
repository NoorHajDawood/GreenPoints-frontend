import React, { useState, useEffect } from 'react';
import classes from './Coupon.module.css'

function Coupon(props) {

    return (
        <div className={classes.card}>
            <img src={require('../../Images/icons/mcdonalds.png')}
                className={classes.logo} />
            <div className={classes.dotted} />
            <div style={{ width: '100%' }}>
                <span className={classes.store}>Macdonalds</span>
                <span className={classes.info}><span className={classes.code}>50%</span> off your order</span>
                <span className={classes.info}>use code: <span className={classes.code}>MC2022</span>
                </span>
            </div>
        </div>
    )
}

export default Coupon;