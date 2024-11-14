import React from 'react';
import Header from '../../../shared/components/Header/Header';
import avatar from '../../../../assets/header-avatar.png';

export default function Dashboard({ loginData }) {
  return (
    <>
      <Header 
        title={`Welcome `} 
        textLight={` ${loginData?.userName} !`}
        description={'This is a welcoming screen for the entry of the application, you can now see the options'}
        img={<img src={avatar} alt="User Avatar" />}
       
      />
    </>
  );
}