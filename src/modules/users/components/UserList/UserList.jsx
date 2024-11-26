import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import avatar from '../../../../assets/userlist.png'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import View from '../../../../assets/View.png'
import Delete from '../../../../assets/delete.png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation'
import NoData from './../../../shared/components/NoData/NoData';
import NoUserImage from '../../../../assets/defaultavatar.jpg';
import Modal from 'react-bootstrap/Modal';
import closeButton from '../../../../assets/closeButton.png';

export default function UserList() {
  const imageBaseURL = 'https://upskilling-egypt.com:3006/'; // Set the base URL
  const [userList ,setUserList]= useState([]);
  const [selectedId ,setSelectedId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showView, setShowView] = useState(false);

  let getUserList = async(pageNo , PageSize) => {
    try{
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Users/`,
        {
          headers: {Authorization:localStorage.getItem("token")},
          params: {pageSize : 5 , pageNumber: pageNo}
        });
      console.log(response.data.data);
      setUserList(response.data.data);
      setArrayOfPages(Array.from( { 
        length: Math.min(5, response.data.totalNumberOfPages) }, 
        (_, i) => i + 1));

    }catch(error){
     console.log(error);
    }
  };

  //Handle delete 
  let deleteUser = () =>{
    try{
        let response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Users/${selectedId}`,
          {
            headers: {Authorization:localStorage.getItem("token")},
          }
        );
        getUserList();
        toast.success("Operation completed successfully!");
      }catch(error){
        toast.error("An error occurred. Please try again."); // Handle errors
      }
      handleCloseDelete();
  };

  //Handle Modal Delete
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  //Modal View
  const handleCloseView = () => setShowView(false);
  const handleShowView = (user) => {
    setSelectedUser(user);
    setShowView(true);
  };

  useEffect(() => {
    getUserList(currentPage);
  }, [currentPage]);

  const handlePageClick = (pageNo) => {
    setCurrentPage(pageNo);
    getUserList(pageNo);
  };

  return (
<>

<Header 
    title={'Users '} 
    textLight={' List !'} 
    description={'This is a welcoming screen for the entry of the application, you can now see the options'}
    img={<img src={avatar} alt="User Avatar" />}
    height={"170px"}
  />
{/* Small Header  */}
<div className='d-flex justify-content-between position-relative align-items-center'>
  <div className='caption '>
    <h5 className='fw-medium'>Users Table Details</h5>
    <p className='fw-light'>You can check all details</p>
  </div>
</div>

<DeleteConfirmation 
    showDelete={showDelete}
    handleCloseDelete={handleCloseDelete}
    deleteItem={'User'}
    deleteFunction={deleteUser}
    />

  {/* View user Modal */}
  <Modal show={showView} onHide={handleCloseView} centered>
    <Modal.Header className='d-flex justify-content-between align-items-center'>
        <h5>View User Data</h5>
        <img role="button" src={closeButton} onClick={handleCloseView} alt="Close" />
    </Modal.Header>
    <Modal.Body className="text-center">
        {selectedUser && (
            <>
              <div className="mb-4">
              {selectedUser.imagePath ? (
                <img 
                src={`${imageBaseURL}/${selectedUser.imagePath}`}
                  alt={selectedUser.name} 
                  style={{ width: '100px', height: '100px', borderRadius: '50%'}} 
                />
              ) : ( 
              <img src={NoUserImage} alt="Placeholder" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
              )}
              </div>
                <h6 className="mb-3"><strong>ID:</strong> {selectedUser.id}</h6>
                <h6 className="mb-3"><strong>User Name:</strong> {selectedUser.userName}</h6>
                <h6 className="mb-3"><strong>Email:</strong> {selectedUser.email}</h6>
                <h6 className="mb-3"><strong>Phone Number:</strong> {selectedUser.phoneNumber}</h6>
                <h6 className="mb-3"><strong>Country:</strong> {selectedUser.country}</h6>
                {/* <h6><strong>Group:</strong> {selectedUser.group}</h6> */}
              
            </>
        )}
    </Modal.Body>
</Modal>

<div className="w-100 rounded-5 py-4 px-5 mb-4 bg-secondary-subtle d-flex justify-content-between align-items-center" >
    <h6>id</h6>
    <h6>User Name</h6>
    <h6>email</h6>
    <h6>phoneNumber</h6>
    <h6>country</h6>
    <h6>Profile Picture</h6>
   
    <h6>Action</h6>
  </div>



  {userList.length > 0 ? 
  <Table striped borderless hover >
    <tbody>
    {userList.map((user) =>(
      <tr key={user.id}>

      <td>{user.id}</td>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.country}</td>  
        {/* <td>{user. user.group[0].name}</td> */}

        <td>  
          
          {user.imagePath ? (
            <img 
             src={`${imageBaseURL}/${user.imagePath}`}
              alt={user.name} 
              style={{ width: '56px', height: '56px'}} 
            />
          ) : ( 
          <img src={NoUserImage} alt="Placeholder" style={{ width: '56px', height: '56px' }} />
           )}
          </td>

        <td> 
        <div className="dropdown">
          <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-solid fa-ellipsis text-success"></i>
          </div>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" onClick={() => handleShowView(user)}><img src={View} alt="" /> View</Link></li>
            
            <li><Link className="dropdown-item"  onClick={()=> handleShowDelete(user.id)} ><img src={Delete} alt="" />Delete</Link></li>
          </ul>
        </div>
        </td>
      </tr>
    ))} 
    </tbody>
  </Table> : <NoData/> } 

{/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          {arrayOfPages.map((pageNo) => (
            <li className={`page-item ${currentPage === pageNo ? 'active' : ''}`} key={pageNo}>
              <Link className="page-link" onClick={() => handlePageClick(pageNo)}>
                {pageNo}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link className="page-link" onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : totalPages)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
</>

  )
}
