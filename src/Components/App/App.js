import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Map } from '../Map';
import QrScanner from '../QRScanner/qrScanner';
import Header from '../Header/header';
import Recycle from '../Recycle/Recycle';
import RecycleResult from '../RecycleResult/RecycleResult';
// import Profile from '../Profile/profile';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <ReactRouter path="/map" element={<><Map /> <button id='recycling-button'/></>} />
        <ReactRouter path="/qrscanner" element={<QrScanner />} />
        <ReactRouter path="/recycle" element={<Recycle />} />
        <ReactRouter path="/recycleresult" element={<RecycleResult />} />
        {/* <ReactRouter path="/profile" element={<Profile />} /> */}
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
