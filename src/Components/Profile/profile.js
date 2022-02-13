import React from 'react';
import { useNavigate } from "react-router-dom";
import './profile.css';
import profilePic from '../../Images/default-profile-picture.svg';
import { RiCopperCoinLine } from 'react-icons/ri'
function Profile(props) {
    const navigate = useNavigate(); 
  
    const routeChange = (path) =>{ 
        navigate(path);
    }
    return (
        <div className='profile'>
            <img src={profilePic} alt="Profile_Pic" />
            <h3>Hans</h3>
            <div className='profile-points'>
                <RiCopperCoinLine className='points-icon' />
                <span> 2803</span>
            </div>
            <div className='profile-buttons'>
                <button className='profile-setting'  onClick={()=>routeChange('/settings')}><span>Settings </span></button>
                <button className='profile-history' onClick={()=>routeChange('/history')} ><span>History </span></button>
            </div>
        </div>


    );


}

export default Profile;