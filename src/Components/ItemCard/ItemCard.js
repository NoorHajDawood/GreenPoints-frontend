import React, { useState, useEffect } from 'react'


function ItemCard(props) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.type);
        }
    }

    return (
        <div onClick={handleClick}
            style={{
                width: props.width ?? '70px',
                height: props.height ?? '82px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: props.selected ? '#189A46' : '#F0F4F3',
                boxShadow: 'inset 0px 2px 2px rgba(0, 0, 0, 0.25)',
            }}>
            {props.icon ? <img src={props.icon}
                style={{
                    height: '40px',
                    filter: props.selected ? 'brightness(0) invert(1)' : '',
                }} /> : <></>}
            <span style={{
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: props.selected ? 'white' : '#708F85',
            }}>{props.type}</span>
        </div>
    )
}

export default ItemCard;