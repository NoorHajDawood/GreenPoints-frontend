import React, { useState, useEffect } from 'react';
import './history.css';
import HistoryItem from '../HistoryItem/historyitem'
import AuthService from '../../Services/auth.service';
function History(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, [])

    const eachActivity = () => {
        return user ? user.activities.map((actvitiy, index) => {
            return <>
                <div className='hr-line' />
                <HistoryItem date={actvitiy.dateTime} points={actvitiy.points} address={actvitiy.address}   />
            </>
        })  : '';
    }

    return (
        <div className='history'>
            <img src={require('../../Images/history-background.png')} alt='history-background' />
            {eachActivity()}
        </div>


    );


}

export default History;