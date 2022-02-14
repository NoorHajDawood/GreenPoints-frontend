import React, { useState } from 'react';
import classes from './Coupon.module.css'
import { RiCopperCoinLine } from 'react-icons/ri';
import UserService from '../../Services/user.service';

function Coupon(props) {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const buyCoupon = async () => {
        let response;
        try {
            response = await UserService.buyCoupon(props.id);
            setSuccess(true);
            props.updatePoints();
        } catch (err) {
            setMessage('Unable to buy coupon');
            console.error(err?.response)
        }
    }

    return (
        <>
            <div className={classes.card}>
                <img src={props.imgUrl ?? ''}
                    className={classes.logo} />
                <div className={classes.dotted} />
                <div style={{ width: '100%' }}>
                    <span className={classes.store}>{props.name ?? 'invalid'}</span>
                    <span className={classes.info}>{props.info ?? 'invalid'}</span>
                    <span className={classes.info}>
                        {props.code ? 'use code:' : 'cost to buy:'} <span className={classes.code}>
                            {props.code ? props.code : <><RiCopperCoinLine /> {props.cost ?? 'invalid'}</>}
                        </span>
                    </span>
                </div>
                {props.code ? '' : <button className={classes.buy} onClick={buyCoupon}>Buy</button>}
            </div>
            {message ? <div className={classes.error}>{message}</div> : ''}
            {success ? <div className={classes.success}>Coupon bought successfuly!</div> : ''}
        </>
    )
}

export default Coupon;