import React, { useState, useEffect } from 'react'
import classes from './headerpage.module.css'
import Popup from 'reactjs-popup';
import Profile from '../Profile/profile';
import { useNavigate } from 'react-router-dom';

function HeaderPage(props) {
    const navigate = useNavigate();

    return (

        <header className={classes.pageHeader}>
            {props.prev ? <button href={props.prev} className={classes.pageBack} onClick={() => navigate(-1)} /> 
            : <a href="/" id={classes.logo}></a>}
            {props.title ? <span className={classes.pageTitle}>{props.title}</span> : ''}
            <Popup trigger={<button className={classes.profile}></button>} modal>
                <Profile />
            </Popup>
        </header>

    )
}

export default HeaderPage;