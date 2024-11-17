
 
import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import avatar from '../../../../assets/userlist.png'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import View from '../../../../assets/View.png'
import Edit from '../../../../assets/Edit.png'
import Delete from '../../../../assets/delete.png'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation'
import NoData from './../../../shared/components/NoData/NoData';
import character from '../../../../assets/character.svg'
import closeButton from '../../../../assets/closeButton.png'
import { useForm } from 'react-hook-form'

// import SmallHeader from '../../../shared/components/SmallHeader/SmallHeader'

export default function CategoriesList() {
  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

 
  //Handel Add Data
  let onSubmit = async(data) => {
    try{
      let response = await axios.post(`https://upskilling-egypt.com:3006/api/v1/Category/`, data );
     console.log(response.data.data);
     getCategoriesList();
     handleCloseAdd();
     toast.success("Operation completed successfully!");
    }catch(error){
     console.log(error);
     }
  }

  const [categoriesList ,setCategoriesList]= useState([]);
  const [selectedId ,setSelectedId] = useState(0);

  //Handel Get Data
  let getCategoriesList = async() => {
    try{
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1`,
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

  //Handle Modal Add
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = (id) => {
    setSelectedId(id);
    //alert(id);
    setShowAdd(true);
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

{/* Small Header  */}
    <div className='d-flex justify-content-between position-relative align-items-center'>
      <div className='caption '>
        <h5 className='fw-medium'> Categories Table Details</h5>
        <p className='fw-light'>You can check all details</p>
      </div>
      <div className='end-0'>
      <button className=' btn btn-success p-3 mt-4 mb-4' onClick={handleShowAdd}  >Add New Categories</button>
      </div>
    </div>
    <Modal show={showAdd} onHide={handleCloseAdd}>
    <Modal.Header className='d-flex justify-content-between'> 
    <h5>Add Category</h5>
    <img role="button" src={closeButton} onClick={handleCloseAdd} alt="" />
    </Modal.Header>
      
          <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-1 rounded-2">
          <input 
          className='input-style' 
          type="text" 
          placeholder='Category Name'
          aria-label="name" 
          aria-describedby="basic-addon1"
          {...register("name" ,
           { required: 'Category Name is required.'}
          )}
           /> 
          </div>
          <div className='my-2'>                
          {errors.name && <span className='text-danger'>{errors.name.message}</span>}
          </div>
          <button className='btn btn-success p-2 mt-4 mb-2 w-100 '> Save </button>
          </form>
          </Modal.Body>
    </Modal>   
{/* End Small Header  */}

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



   