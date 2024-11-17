
 
import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import avatar from '../../../../assets/userlist.png'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import View from '../../../../assets/View.png'
import Edit from '../../../../assets/Edit.png'
import Delete from '../../../../assets/delete.png'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation'
import NoData from './../../../shared/components/NoData/NoData';
import SmallHeader from '../../../shared/components/SmallHeader/SmallHeader'

export default function CategoriesList() {

  const [categoriesList ,setCategoriesList]= useState([]);
  const [selectedId ,setSelectedId] = useState(0);

  let getCategoriesList = async() => {
    try{
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1`,
        {
          headers: {Authorization:localStorage.getItem("token")},
        }
      );
      setCategoriesList(response.data.data)
      // console.log(response.data.data);
    }catch(error){
     console.log(error);
    }
  }
  //Handle delete 
  let deleteCategory = () =>{
    try{
        let response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`,
          {
            headers: {Authorization:localStorage.getItem("token")},
          }
        );
        console.log(response);
        getCategoriesList();
        toast.success("Operation completed successfully!");
      }catch(error){
        toast.error("An error occurred. Please try again."); // Handle errors
        // console.error("error");
      }
    // alert("deleteee");
    // alert(selectedId);
    handleCloseDelete();
  };

  useEffect(() =>{
    getCategoriesList()
  },[]);


  //Handle Modal Delete
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    //alert(id);
    setShowDelete(true);
  };


  return (
   <> 
    <Header 
    title={'Categories '} 
    textLight={'Items'} 
    description={'You can now add your items that any user can order it from the Application and you can edit'}
    img={<img src={avatar} alt="User Avatar" />}
    height={"170px"}
    />
 
    <SmallHeader 
     title={'Categories'} 
    />

    <DeleteConfirmation 
    showDelete={showDelete}
    handleCloseDelete={handleCloseDelete}
    deleteItem={'Category'}
    deleteFunction={deleteCategory}
    />

    <div className="w-100 rounded-5 py-4 px-5 mb-4 bg-secondary-subtle d-flex justify-content-between align-items-center" >
      <h6>Name</h6>
      <h6>Actions</h6>
    </div>
    <div>
    {categoriesList.length > 0 ? 
    <Table striped borderless hover >
      <tbody>
     { categoriesList.map((category) => (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.creationDate}</td>
          <td>
          <div className="dropdown">
            <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-ellipsis text-success"></i>
            </div>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item"  onClick={handleShowDelete} href="#"><img src={View} alt="" />View</Link></li>
              <li><Link className="dropdown-item"  onClick={handleShowDelete}  href="#"><img src={Edit} alt="" />Edit</Link></li>
              <li><Link className="dropdown-item"  onClick={()=> handleShowDelete(category.id)} href="#"><img src={Delete} alt="" />Delete</Link></li>
            </ul>
          </div>
          </td>
        </tr>
      )) } 
      </tbody>
    </Table>
     : <NoData/> }
  
    </div>
   </>
  )
}



   