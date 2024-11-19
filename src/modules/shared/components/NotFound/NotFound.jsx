import React from 'react';
import './NotFound.css'; // Assuming you create a CSS file for styles
import Logo from '../../../../assets/logo.svg'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
  <>
  <div className='d-flex '>
  <div className='not-found-container col-6'>
    <div className='right-section col-6'>
      <img className='margin-bottom' src={Logo} alt="" />
      <h1 className='font-weight-bold '>Oops.... </h1>
      <h1 className='font-weight-light text-success'>Page  not  found </h1>
      <p className='font-weight-light'>This Page doesn’t exist or was removed!We suggest you  back to home.</p>
      <Link to='/dashboard' >
        <button className=' btn btn-success btn-lg  py-2 px-5 mt-4 mb-2 tex'><i className="fa-solid fa-arrow-right px-2"></i> Back To Home </button>
      </Link>
    </div>
    </div>
  </div>
  </>
  );
}