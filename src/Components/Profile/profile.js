import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './profile.css';
import profilePic from '../../Images/default-profile-picture.svg';
import { RiCopperCoinLine } from 'react-icons/ri';
import AuthService from '../../Services/auth.service';

function Profile(props) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, [])

    const routeChange = (path) => {
        navigate(path);
    }
    return (
        <div className='profile'>
            <img src={user?.imgUrl ?? profilePic} alt="Profile_Pic" />
            <h3>{user?.name}</h3>
            <div className='profile-points'>
                <RiCopperCoinLine className='points-icon' />
                <span> {user?.points}</span>
            </div>
            <div className='profile-buttons'>
                <button className='profile-setting' onClick={() => routeChange('/settings')}><span>Settings</span></button>
                <button className='profile-history' onClick={() => routeChange('/history')} ><span>History</span></button>
                {user?.moderator ? <button className='profile-dashboard' onClick={() => routeChange('/admindashboard')} ><span>Dashboard</span></button> : ''}
            </div>
        </div>


    );


}

export default Profile;