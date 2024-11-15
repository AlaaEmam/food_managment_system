import character from '../../../../assets/character.svg'
import closeButton from '../../../../assets/closeButton.png'
 
import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import avatar from '../../../../assets/userlist.png'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import View from '../../../../assets/View.png'
import Edit from '../../../../assets/Edit.png'
import Delete from '../../../../assets/delete.png'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify';

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
    handleClose();
  };

  useEffect(() =>{
    getCategoriesList()
  },[]);


  //Handle Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    //alert(id);
    setShow(true);

  };


  return (
   <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
        <img src={closeButton} onClick={handleClose} alt="" />
        </Modal.Header>
        <Modal.Body>
         <div className="text-center">
         <img src={character} alt="" />
          <h5>Delete This Category ?</h5>
          <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>  
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
          className="btn-danger" 
          onClick={deleteCategory}
          aria-hidden="true"
          >
          Delete this Categories
          </Button>
        </Modal.Footer>
      </Modal> 
       
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
            <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-ellipsis text-success"></i>
            </div>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item"  onClick={handleShow} href="#"><img src={View} alt="" />View</Link></li>
              <li><Link className="dropdown-item"  onClick={handleShow}  href="#"><img src={Edit} alt="" />Edit</Link></li>
              <li><Link className="dropdown-item"  onClick={()=> handleShow(category.id)} href="#"><img src={Delete} alt="" />Delete</Link></li>
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



   