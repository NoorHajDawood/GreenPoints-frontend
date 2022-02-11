import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'

function QrScanner(props) {
    const [result, setResult] = useState('No result');
    const handleScan = data => {
        if (data) {
            setResult(data)
        }
    }
    const handleError = err => {
        console.error(err)
    }
    return (
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <p>{result}</p>
        </div>
    )

}

export default QrScanner;