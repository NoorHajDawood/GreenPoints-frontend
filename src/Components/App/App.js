import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Map } from '../Map';
import QrScanner from '../QRScanner/qrScanner';
import Recycle from '../Recycle/Recycle';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Settings from '../Settings/settings';
import History from '../History/history';
import CouponsPage from '../CouponsPage/CouponsPage';
import CouponShop from '../CouponShop/CouponShop';
import HeaderPage from '../HeaderPages/headerpage';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

function App() {
  

  return (
    <div className="App">

      <BrowserRouter>
        <ReactRouter path="/" HeaderPage>
          <>
            <Map />
            <Link id='recycling-button' to='/couponspage' />
          </>
        </ReactRouter>
        <ReactRouter path="/qrscanner" HeaderPage title={'Qr Scanner'} prev>
          <QrScanner />
        </ReactRouter>
        <ReactRouter path="/recycle" HeaderPage title={'Recycle'} prev>
          <Recycle />
        </ReactRouter>
        <ReactRouter path="/login" >
          <Login />
        </ReactRouter>
        <ReactRouter path="/settings" HeaderPage title={'Settings'} prev>
          <Settings />
        </ReactRouter>
        <ReactRouter path="/signup" >
          <Signup />
        </ReactRouter>
        <ReactRouter path="/history" HeaderPage title={'History'} prev>
          <History />
        </ReactRouter>
        <ReactRouter path="/couponspage" HeaderPage title={'Coupons'} prev>
          <CouponsPage />
        </ReactRouter>
        <ReactRouter path="/couponshop" HeaderPage title={'Coupon Shop'} prev>
          <CouponShop />
        </ReactRouter>
        <ReactRouter path="/admindashboard" HeaderPage title={'Admin Dashboard'} prev>
          <AdminDashboard />
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
          {props.HeaderPage ? <HeaderPage className='show-hide-header' title={props.title} prev={props.prev} /> : ''}
          {props.children}
        </>
      } />
    </Routes>
  )
}

export default App;
