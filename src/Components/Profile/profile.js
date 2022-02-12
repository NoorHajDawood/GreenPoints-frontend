import React from 'react';
import './profile.css';
import profilePic from '../../Images/default-profile-picture.svg';

function Profile(props) {

    return (
        <div className='profile'>
            <img src={profilePic} alt="Profile_Pic"/>
            <h3>Hans</h3>
            <div className='profile-buttons'>
                <button className='profile-setting'><span>settings </span></button>
                <button className='profile-history'><span>History </span></button>

            </div>
        </div>


    );


}

export default Profile;