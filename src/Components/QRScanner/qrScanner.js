import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import { IoMdQrScanner } from 'react-icons/io';

function QrScanner(props) {
    const [binId, setBinId] = useState('No result');
    const handleScan = data => {
        if (data) {
            setBinId(data)
        }
    }
    const handleError = err => {
        console.error(err)
    }
    return (
        <>
            <div style={{
                boxSizing: 'border-box',
                paddingTop: '90px',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '34px',
            }}>
                <span style={{color: '#189A46', lineHeight: '0'}}>
                    <IoMdQrScanner size={30}/>
                </span>
                <span style={{fontSize: '16px', lineHeight: '24px', fontWeight: 'bold'}}>
                    Scan the code
                </span>
            </div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{
                    width: '100%',
                    background: 'white',
                }}
            />
            <span style={{fontSize: '10px', color: '#DA762D'}}>
                Scan the QR Code on the Recycle Bin to start recycling
                </span>
        </>
    )

}

export default QrScanner;