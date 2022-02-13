import React, { useState, useEffect } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import plastic from '../../Images/icons/plastic.svg';
import glass from '../../Images/icons/glass.svg';
import paper from '../../Images/icons/paper.svg';
import can from '../../Images/icons/can.svg';
import { IoMdQrScanner } from 'react-icons/io';
import classes from './Recycle.module.css';

function Recycle(props) {
    const [type, setType] = useState("");

    return (
        <>
            <div className={classes.cover} />

            <h3 className={classes.h3}>
                Are you ready?
            </h3>

            <span className={classes.info}>
                before start to scan, let's select the items you want to recycle
            </span>

            <div className={classes.items}>
                <ItemCard icon={plastic} type='plastic' selected={type === 'plastic' ? true : false} />
                <ItemCard icon={glass} type='glass' selected={type === 'glass' ? true : false} />
                <ItemCard icon={paper} type='paper' selected={type === 'paper' ? true : false} />
                <ItemCard icon={can} type='can' selected={type === 'can' ? true : false} />
                <ItemCard type='other' width='100%' height='41px' selected={type === 'other' ? true : false} />
            </div>

            <a href='/qrscanner' className={classes.a}>
                <IoMdQrScanner style={{ verticalAlign: 'middle' }} /> Scan
            </a>

            {type ? <button className={classes.next}></button> : ''}
        </>
    )
}

export default Recycle;