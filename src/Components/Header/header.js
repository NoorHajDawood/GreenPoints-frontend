import React, { useState, useEffect } from 'react'
import './header.css'
import Popup from 'reactjs-popup';
import Profile from '../Profile/profile';

function Header() {

    return (

        <header className="user-header">
            <a href="/" id="logo"></a>
            <Popup trigger={<button id="profile"></button>} modal>
            <Profile />
          </Popup>
        </header>

    )
}

export default Header;