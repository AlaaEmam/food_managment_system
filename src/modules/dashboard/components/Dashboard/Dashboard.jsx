import React from 'react';
import Header from '../../../shared/components/Header/Header';
import avatar from '../../../../assets/header-avatar.png';
import { Link } from 'react-router-dom';

export default function Dashboard({ loginData }) {
  return (
    <>
      <Header 
        title={`Welcome `} 
        textLight={` ${loginData?.userName} !`}
        description={'This is a welcoming screen for the entry of the application, you can now see the options'}
        img={<img src={avatar} alt="User Avatar" />}
       
      />

  <div className='dashboard-container p-5 h-25 d-flex justify-content-between position-relative align-items-center'>
      <div className='caption '>
        <h3 className='fw-bold'>Fill the <span className='fw-normal text-success'> Recipes </span> ! </h3>
        <p className='fw-light'>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
      </div>
      <div className='end-0'>
      <Link to='/dashboard/recipes' >
      <button className=' btn btn-success  p-2 mt-4 mb-2 tex'>Fill Recipes<i className="fa-solid fa-arrow-right px-2"></i> </button>
      </Link>
      
      </div>
    </div>
    </>
  );
}