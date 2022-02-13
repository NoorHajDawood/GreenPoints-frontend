import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Map } from '../Map';
import QrScanner from '../QRScanner/qrScanner';
import Recycle from '../Recycle/Recycle';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Settings from '../Settings/settings';
import History from '../History/history';
import CouponsPage from '../CouponsPage/CouponsPage';
import HeaderPage from '../HeaderPages/headerpage';

function App() {
  const [pageTitle, setPageTitle] = useState('');
  const [prevPage, setPrevPage] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <ReactRouter path="/" HeaderPage>
          <>
            <Map />
            <a id='recycling-button' href='/couponspage' />
          </>
        </ReactRouter>
        <ReactRouter path="/qrscanner" HeaderPage title={'Qr Scanner'} prev={'/'}>
          <QrScanner />
        </ReactRouter>
        <ReactRouter path="/recycle" HeaderPage title={'Recycle'} prev={'/'}>
          <Recycle />
        </ReactRouter>
        <ReactRouter path="/login">
          <Login />
        </ReactRouter>
        <ReactRouter path="/settings" HeaderPage title={'Settings'} prev={'/'}>
          <Settings />
        </ReactRouter>
        <ReactRouter path="/signup" >
          <Signup />
        </ReactRouter>
        <ReactRouter path="/history" HeaderPage title={'History'} prev={'/'}>
          <History />
        </ReactRouter>
        <ReactRouter path="/couponspage" HeaderPage title={'Coupons'} prev={'/'}>
          <CouponsPage />
        </ReactRouter>
      </BrowserRouter>

    </div>
  );
}

function ReactRouter(props) {
  return (
    <Routes>
      <Route exact path={props.path} element={
        <>
          {props.HeaderPage ? <HeaderPage title={props.title} prev={props.prev} /> : ''}
          {props.children}
        </>
      } />
    </Routes>
  )
}

export default App;
