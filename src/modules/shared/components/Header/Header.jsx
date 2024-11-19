import React from 'react';


export default function Header({ title, textLight ,description, img ,height }) {
  
  return (
    <div className='header-container text-white p-5 d-flex justify-content-between position-relative align-items-center'
    style={{ height: height || '40vh' }}
    >
      <div className='caption '>
        <h3 className='fw-bold fs-1'>
          {title}
          <span className='fw-normal text-white-80 fs-1'>
           {textLight} 
          </span>
          </h3>
        <p className='fw-light'>{description}</p>
      </div>
      <div className='position-absolute  end-0'>
        {img} 
      </div>
    </div>
  );
}