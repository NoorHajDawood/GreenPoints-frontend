import React, { useState, useEffect } from 'react';
import CouponsList from '../CouponsList/CouponsList';
import { VscHistory } from 'react-icons/vsc';
import { FaRecycle } from 'react-icons/fa';
import classes from './CouponsPage.module.css'
import {RiCopperCoinLine} from 'react-icons/ri'
function CouponsPage(props) {

    return (
        <div className={classes.container}>
            <span className={classes.title}>Here's what you've earned by saving the planet!</span>
            <div className={classes.couponsPoints}>
                <RiCopperCoinLine className={classes.pointsIcon}/>
                 <span> 2803</span>
                </div>
            <CouponsList />
            {/* <div className={classes.couponsPage}>
                <RiCopperCoinLine className={classes.pointIcon} />
                <span> 2803</span>
            </div> */}
            <a href="/recycle" className={classes.recycle}>
                <span className={classes.btn}><FaRecycle size={30}/></span>
                <span className={classes.recycleSpan}>Recycle</span>
            </a>
        </div>
    )
}

export default CouponsPage;