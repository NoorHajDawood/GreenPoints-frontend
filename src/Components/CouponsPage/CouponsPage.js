import React, { useState, useEffect } from 'react';
import CouponsList from '../CouponsList/CouponsList';
import { FaRecycle } from 'react-icons/fa';
import classes from './CouponsPage.module.css';
import { RiCopperCoinLine } from 'react-icons/ri';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import AuthService from '../../Services/auth.service';
import { Link } from 'react-router-dom';

function CouponsPage(props) {
    const [user, setUser] = useState(null);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, [])

    useEffect(() => {
        setCoupons(user?.coupons ?? []);
    }, [user]);

    useEffect(() => {
        console.log(coupons)
    }, [coupons]);

    return (
        <div className={classes.container}>
            <span className={classes.title}>Here's what you've earned by saving the planet!</span>
            <div className={classes.couponsPoints}>
                <RiCopperCoinLine className={classes.pointsIcon} />
                <span> {user?.points}</span>
            </div>
            <CouponsList coupons={coupons} />
            <Link to="/recycle" className={classes.recycle}>
                <span className={classes.btn}><FaRecycle size={30} /></span>
                <span className={classes.recycleSpan}>Recycle</span>
            </Link>
            <Link to="/couponshop" className={classes.shop}>
                <span className={classes.shopBtn}><HiOutlineShoppingBag size={30} /></span>
                <span className={classes.recycleSpan}>Shop</span>
            </Link>
        </div>
    )
}

export default CouponsPage;