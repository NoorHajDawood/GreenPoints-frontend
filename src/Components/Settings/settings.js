import React from 'react';
import './settings.css';
import HeaderPage from '../HeaderPages/headerpage';
import AuthService from '../../Services/auth.service';

function Settings(props) {
    const logOut = () => {
        AuthService.logout();
    }
    return (
        <>
            <div className='setiings'>
                <div className='hr-line' />
                <div className='settings-options'>
                    <span id='account-icon'>Account</span>
                    <div className='hr-line' />
                    <span id='notification-icon'>Notification</span>
                    <div className='hr-line' />
                    <span id='appearance-icon'>Appearance</span>
                    <div className='hr-line' />
                    <span id='privacy-icon'>Privacy</span>
                    <div className='hr-line' />
                    <span id='support-icon'>Help & Support</span>
                    <div className='hr-line' />
                    <a href='/login' id='log-out-icon' onClick={logOut}>
                        Logout
                    </a>
                </div>
            </div>
        </>
    );


}

export default Settings;