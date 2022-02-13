import React, { useState, useEffect } from 'react';
import CouponsList from '../CouponsList/CouponsList';
import { VscHistory } from 'react-icons/vsc';
import { FaRecycle } from 'react-icons/fa';
import classes from './CouponsPage.module.css'

function CouponsPage(props) {

    return (
        <div className={classes.container}>
            <span className={classes.title}>Here's what you've earned by saving the planet!</span>
            <button className={classes.history}>
                <VscHistory style={{ verticalAlign: 'middle' }} /> see my records
                </button>
            <CouponsList />
            <a href="/recycle" className={classes.recycle}>
                <span className={classes.btn}><FaRecycle size={30}/></span>
                <span className={classes.recycleSpan}>Recycle</span>
            </a>
        </div>
    )
}

export default CouponsPage;