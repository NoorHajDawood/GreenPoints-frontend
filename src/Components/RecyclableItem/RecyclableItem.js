import React, { useState, useEffect } from 'react'


function RecyclableItem(props) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        props.onClick(props.type, !selected);
        setSelected(!selected);
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
                background: selected ? '#189A46' : '#F0F4F3',
                boxShadow: 'inset 0px 2px 2px rgba(0, 0, 0, 0.25)',
            }}>
            {props.icon ? <img src={props.icon}
                style={{
                    height: '40px',
                    filter: selected ? 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(144deg) brightness(113%) contrast(115%)' : 
                    'invert(61%) sepia(11%) saturate(596%) hue-rotate(110deg) brightness(85%) contrast(90%)',
                }} /> : <></>}
            <span style={{
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: selected ? 'white' : '#708F85',
            }}>{props.type}</span>
        </div>
    )
}

export default RecyclableItem;