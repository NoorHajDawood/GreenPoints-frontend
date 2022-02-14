import React, { useState, useEffect } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { BiCheckCircle } from 'react-icons/bi';
import success from '../../Images/success-trash.svg'
import classes from './RecycleResult.module.css';

function RecycleResult(props) {

    return (
        <div className={classes.container}>
            <img src={success} className={classes.img} />
            {props.proccessing ? <h3>Proccessing Please Wait...</h3> : <>
                <div className={classes.flexbox}>
                    <h3>
                        Successful Recycle!
                    </h3>
                    <span className={classes.earned}>
                        <BiCheckCircle style={{ verticalAlign: 'middle' }} /> Points Earned
                    </span>
                    <span className={classes.points}>
                        +{props.points} Points
                    </span>
                </div>
                <TiArrowBack size={40} />
                <a href='/' className={classes.home}>Back to home</a>
            </>}

        </div>
    )
}

export default RecycleResult;