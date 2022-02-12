import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Map } from '../Map';
import QrScanner from '../QRScanner/qrScanner';
import Header from '../Header/header';
import Recycle from '../Recycle/Recycle';
import RecycleResult from '../RecycleResult/RecycleResult';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Profile from '../Profile/profile';
import Settings from '../Settings/settings';
import History from '../History/history';
import CouponsPage from '../CouponsPage/CouponsPage';
import TrashInformation from '../TrashInformation/Trashinformation'

import Popup from 'reactjs-popup';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <ReactRouter path="/map" element={<><Map />

          <Popup trigger={<button id='recycling-button' />}>
            <TrashInformation />
          </Popup>
        </>} />
        <ReactRouter path="/qrscanner" element={<QrScanner />} />
        <ReactRouter path="/recycle" element={<Recycle />} />
        <ReactRouter path="/recycleresult" element={<RecycleResult />} />
        <ReactRouter path="/login" element={<Login />} />
        <ReactRouter path="/profile" element={<Profile />} />
        <ReactRouter path="/settings" exact element={<Settings />} />
        <ReactRouter path="/signup" element={<Signup />} />
        <ReactRouter path="/history" element={<History />} />
        <ReactRouter path="/couponspage" element={<CouponsPage />} />
        <ReactRouter path="/trashinformation" element={<TrashInformation />} />

      </BrowserRouter>

    </div>
  );
}

function ReactRouter(props) {
  return (
    <Routes>
      <Route exact path={props.path} element={props.element} />
    </Routes>
  )
}

export default App;
