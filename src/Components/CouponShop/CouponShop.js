import React, { useState, useEffect } from 'react';
import classes from './CouponShop.module.css';
import Coupon from '../Coupon/Coupon';
import AuthService from '../../Services/auth.service';
import { RiCopperCoinLine } from 'react-icons/ri';
import CouponsList from '../CouponsList/CouponsList';
import CouponService from '../../Services/coupon.service';
import UserService from '../../Services/user.service';

function CouponShop(props) {
    const [user, setUser] = useState(null);
    const [coupons, setCoupons] = useState([]);

    const getCoupons = async () => {
        const result = await CouponService.getCoupons();
        setCoupons(result.data.map((coupon) => {
            delete coupon.code;
            return coupon;
        }));
    }

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
        getCoupons();
    }, [])

    const updatePoints = async () => {
        try {
            await UserService.updateCurrentUser();
            setUser(AuthService.getCurrentUser());
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={classes.container}>
            <span className={classes.title}>Spend your earned points on some coupons!</span>
            <div className={classes.couponsPoints}>
                <RiCopperCoinLine className={classes.pointsIcon} />
                <span> {user?.points}</span>
            </div>
            <CouponsList coupons={coupons} updatePoints={updatePoints} />
        </div>
    )
}

export default CouponShop;