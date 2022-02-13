import React from 'react';
import './historyitem.css'
function HistoryItem(props) {
    return (
        <div className='history-item'>
            <div className='history-title-date'>
                <h6>2021.5.6 13:20 (GMT+0800)</h6>
                <h5>National Taiwan University</h5>
            </div>
            <div className='points'>
                <h6>Points (Earn)</h6>
                <h5>59</h5>
            </div>

        </div>


    );


}

export default HistoryItem;