import React, { useState, useEffect } from 'react';
import plant from '../../Images/holding-plant.svg';
import classes from './Login.module.css';

function Login(props) {

    return (
        <div className={classes.container}>
            <img src={plant} className={classes.img}/>
            <h3 className={classes.h3}>Hello!</h3>
            <div className={classes.credentials}>
                <input type='email' placeholder='E-mail' className={classes.input} style={{ marginBottom: '18px' }} />
                <input type='password' placeholder='Password' className={classes.input}/>
                <a href='/map' className={classes.a}>Forgot Password?</a>
            </div>
            <div>
                <button className={classes.login}>Log In</button>
                <span className={classes.span}>OR</span>
                <button className={classes.signup}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login;