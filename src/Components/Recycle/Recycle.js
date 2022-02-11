import React, { useState, useEffect } from 'react';
import RecyclableItem from '../RecyclableItem/RecyclableItem';
import plastic from '../../Images/icons/plastic.svg';
import glass from '../../Images/icons/glass.svg';
import paper from '../../Images/icons/paper.svg';
import can from '../../Images/icons/can.svg';
import { IoMdQrScanner } from 'react-icons/io';

function Recycle(props) {
    const [types, setTypes] = useState([])

    const selectType = (type, isSelected) => {
        let index = types.indexOf(type)
        if(isSelected && index === -1) {
            setTypes([...types, type]);
        } else if(!isSelected) {
            setTypes(types.filter(item => item !== type))
        }
    }

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
                <RecyclableItem icon={plastic} type='plastic' onClick={selectType}/>
                <RecyclableItem icon={glass} type='glass' onClick={selectType}/>
                <RecyclableItem icon={paper} type='paper' onClick={selectType}/>
                <RecyclableItem icon={can} type='can' onClick={selectType}/>
                <RecyclableItem type='other' width='100%' height='41px' onClick={selectType}/>
            </div>

            <button style={{
                width: '78px',
                height: '36px',
                borderRadius: '10px',
                background: '#D3DEDB',
                fontSize: '16px',
                lineHeight: '16px',
                fontWeight: 'bold',
                color: '#384742',
                border: 'none',
                textAlign: 'center',
                marginTop: '84px',
            }}><IoMdQrScanner style={{ verticalAlign: 'bottom' }}/> Scan</button>
        </>
    )
}

export default Recycle;