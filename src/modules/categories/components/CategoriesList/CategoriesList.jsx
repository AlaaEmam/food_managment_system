import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import avatar from '../../../../assets/userlist.png';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import View from '../../../../assets/View.png'
import Edit from '../../../../assets/Edit.png'
import Delete from '../../../../assets/delete.png'

import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

export default function CategoriesList() {

  const [categoriesList ,setCategoriesList]= useState([]);

  let getCategoriesList = async() => {
    try{
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
        {
          headers: {Authorization:localStorage.getItem("token")},
        }
      );
      setCategoriesList(response.data.data)
      console.log(response.data.data);
    }catch(error){
     console.log(error);
    }
  }

  useEffect(() =>{
    getCategoriesList()
  },[]);

  return (
   <>
      <Header 
      title={'Categories '} 
      textLight={'Item'} 
      description={'You can now add your items that any user can order it from the Application and you can edit'}
      img={<img src={avatar} alt="User Avatar" />}
      height={"30vh"}
      />

  <div className='d-flex justify-content-between position-relative align-items-center'>
        <div className='caption '>
          <h5 className='fw-medium'>Categories Table Details</h5>
          <p className='fw-light'>You can check all details</p>
        </div>
        <div className='end-0'>
        <button className=' btn btn-success  p-2 mt-4 mb-2 tex'>Add New Category</button>
        </div>
    </div>

    <div>
    <Table striped borderless hover size="sm">
      <thead className='bg-success'>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Created Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {categoriesList.map(category =>
        <tr>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.creationDate}</td>
          <td>
          <div className="dropdown">
            <button className=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="#"><img src={View} alt="" />View</Link></li>
              <li><Link className="dropdown-item" href="#"><img src={Edit} alt="" />Edit</Link></li>
              <li><Link className="dropdown-item" href="#"><img src={Delete} alt="" />Delete</Link></li>
            </ul>
          </div>
          </td>
        </tr>
      )}
      </tbody>
    </Table>
  
    </div>
   </>
  )
}



   