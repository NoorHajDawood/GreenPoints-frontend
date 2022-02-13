import React, { useState, useEffect } from 'react';
import './history.css';
import HistoryItem from '../HistoryItem/historyitem'
function History(props) {
    // const [type, setType] = useState("");
    return (
        <div className='history'>
            <span className='back-arrow' />
            <h3>Recycle History</h3>
            <img src={require('../../Images/history-background.png')} alt='history-background' />
            <div className='hr-line' />
            <HistoryItem/>
            <div className='hr-line' />

        </div>


    );


}

export default History;