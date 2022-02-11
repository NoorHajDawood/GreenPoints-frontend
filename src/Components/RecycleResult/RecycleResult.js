import React, { useState, useEffect } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { BiCheckCircle } from 'react-icons/bi';
import success from '../../Images/success-trash.svg'
function RecycleResult(props) {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '60px',
            height: '100%',
        }}>
            <img src={success}
                style={{
                    width: '113px',
                    height: '121px',
                }}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h3>
                    Successful Recycle!
                </h3>
                <span style={{
                    color: 'white',
                    background: '#189A46',
                    borderRadius: '5px',
                    width: '144px',
                    fontSize: '12px',
                    lineHeight: '23px',
                    height: '23px',
                }}>
                    <BiCheckCircle style={{ verticalAlign: 'middle' }} /> Points Earned
                </span>
                <span style={{
                    color: '#189A46',
                    fontWeight: '500',
                }}>
                    +150 Points
                </span>
            </div>
            <TiArrowBack size={40} />
            <button style={{
                background: 'white',
                border: '1px solid black',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '500',
                width: '131px',
                height: '36px',
            }}>Back to home</button>
        </div>
    )
}

export default RecycleResult;