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
import Pagination from '../../../shared/components/Pagination/Pagination'

export default function UserList() {
  const imageBaseURL = 'https://upskilling-egypt.com:3006/'; // Set the base URL
  const [userList ,setUserList]= useState([]);
  const [selectedId ,setSelectedId] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showView, setShowView] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const [selectedGroup, setSelectedGroup] = useState('');
  const groups = [
    { id: 1, name: "Group Admin" },
    { id: 2, name: "System User" },
  ];

  // Fetch user list
  const getUserList = async (pageNo, pageSize, userName ,groups) => {
    try {
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Users/`, {
        headers: { Authorization: localStorage.getItem("token") },
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          userName: userName,
          groups: groups,
        }
      });
      setUserList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users.");
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
        getUserList(currentPage, 5);
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

  // Handel Search input
  const getnameValue = (input) => {
  setNameValue(input.target.value);
  getUserList( 1 , 5 , input.target.value , groups);
  };

  //Handel Filter by groupId
  const handleGroupChange = (event) => {
    const groups = event.target.value;
    setSelectedGroup(groups);
    getUserList(1, 5, nameValue, groups); // Reset to page 1 on group change
  };

  // Handel Pagination
  useEffect(() => {
    getUserList(currentPage, 5 , nameValue, selectedGroup);
  }, [currentPage]);

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
    getUserList(pageNo, 5);
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
                <h6 className="mb-3"><strong>Group:</strong>  {selectedUser.group ? selectedUser.group.name : 'N/A'}  </h6> 
              
            </>
        )}
    </Modal.Body>
</Modal>

  {/* Fillter & Search  */}
  <div className="mb-4 d-flex">
  <div className="search-bar col-md-9 m-1">
    <input
      type="text"
      className="form-control"
      placeholder="Search here..."
      onChange={getnameValue}
    />
  </div>

  <div className="tags-dropdown  m-1 col-md-3">
    <select 
    className="form-select" 
    value={selectedGroup} 
    onChange={handleGroupChange}
    >
      <option value="">Group</option>
            {groups.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
    </select>
  </div>
</div>


<div className="w-100 rounded-5 py-4 px-5 mb-4 bg-secondary-subtle d-flex justify-content-between align-items-center" >
    <h6>id</h6>
    <h6>User Name</h6>
    <h6>email</h6>
    <h6>phoneNumber</h6>
    <h6>country</h6>
    <h6> Group</h6>
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
      <td>{user.group.name}</td>

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

  {/* Pagination Component */}
   <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
  
</>

  )
}
