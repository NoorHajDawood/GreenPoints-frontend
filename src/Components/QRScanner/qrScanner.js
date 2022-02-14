import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import { IoMdQrScanner } from 'react-icons/io';
import classes from './QrScanner.module.css';
import { useNavigate } from 'react-router-dom';

function QrScanner(props) {
    const [binId, setBinId] = useState('');
    const navigate = useNavigate();

    const handleScan = data => {
        if (data) {
            setBinId(data)
        }
    }

    useEffect(() => {
        if (binId) {
            navigate(`/recycle?binId=${binId}`)
        }
    }, [binId]);

    const handleError = err => {
        console.error(err)
    }

    return (
        <>
            <div className={classes.container}>
                <span className={classes.scannericon}>
                    <IoMdQrScanner size={30} />
                </span>
                <span className={classes.scantitle}>
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
            <span className={classes.scaninfo}>
                Scan the QR Code on the Recycle Bin to start recycling
            </span>
        </>
    )

}

export default QrScanner;