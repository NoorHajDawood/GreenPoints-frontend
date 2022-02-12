import React, { useState, useEffect } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import plastic from '../../Images/icons/plastic.svg';
import glass from '../../Images/icons/glass.svg';
import paper from '../../Images/icons/paper.svg';
import can from '../../Images/icons/can.svg';
import { IoMdQrScanner } from 'react-icons/io';

function Recycle(props) {
    const [type, setType] = useState("");

    return (
        <>
            <div style={{
                height: '20%',
                overflow: 'hidden',
                background: `url(${require('../../Images/beverage-green-empty-bottle.jpg')}) no-repeat`,
                backgroundSize: 'cover'
            }} />

            <h3 style={{
                marginTop: '40px',
                fontSize: '1.5rem'
            }}>Are you ready?</h3>

            <span style={{
                fontSize: '0.75rem',
                color: '#708F85'
            }}>before start to scan, let's select the items you want to recycle</span>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                rowGap: '14px',
                flexWrap: 'wrap',
                margin: '70px 16px',
            }}>
                <ItemCard icon={plastic} type='plastic' selected={type === 'plastic' ? true : false}/>
                <ItemCard icon={glass} type='glass' selected={type === 'glass' ? true : false}/>
                <ItemCard icon={paper} type='paper' selected={type === 'paper' ? true : false}/>
                <ItemCard icon={can} type='can' selected={type === 'can' ? true : false}/>
                <ItemCard type='other' width='100%' height='41px' selected={type === 'other' ? true : false}/>
            </div>

            <button style={{
                width: '78px',
                height: '36px',
                borderRadius: '10px',
                background: '#222B28',
                fontSize: '16px',
                lineHeight: '16px',
                fontWeight: 'bold',
                color: '#384742',
                border: 'none',
                textAlign: 'center',
                marginTop: '84px',
                color: '#F9FBFA',
            }}><IoMdQrScanner style={{ verticalAlign: 'bottom' }}/> Scan</button>
        </>
    )
}

export default Recycle;