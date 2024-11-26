import React, { useEffect, useState } from 'react';
import Header from '../../../shared/components/Header/Header';
import avatar from '../../../../assets/userlist.png';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import View from '../../../../assets/View.png';
import Edit from '../../../../assets/Edit.png';
import Delete from '../../../../assets/delete.png';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from './../../../shared/components/NoData/NoData';
import closeButton from '../../../../assets/closeButton.png';
import { useForm } from 'react-hook-form';

export default function CategoriesList() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle Add Data
  const onSubmitAdd = async (data) => {
    try {
      await axios.post(`https://upskilling-egypt.com:3006/api/v1/Category/`, data, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      getCategoriesList();
      handleCloseAdd();
      toast.success("Category added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category. Please check your authentication.");
    }
  };

  // Handle Update Data with Authentication
  const onSubmitUpdate = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to update categories.");
      return;
    }

    try {
      await axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`, data, {
        headers: { Authorization: token }
      });
      getCategoriesList();
      handleCloseUpdate();
      toast.success("Category updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category. Please check your authentication.");
    }
  };

  // Fetch Categories List
  const getCategoriesList = async () => {
    try {
      const response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setCategoriesList(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories. Please check your authentication.");
    }
  };

  // Handle Delete
  const deleteCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to delete categories.");
      return;
    }

    try {
      await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`, {
        headers: { Authorization: token },
      });
      getCategoriesList();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category. Please check your authentication.");
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  // Modal Handlers
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (category) => {
    setSelectedId(category.id);
    setValue("name", category.name);
    setShowUpdate(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  //Modal View
  const handleCloseView = () => setShowView(false);
  const handleShowView = (category) => {
    setSelectedCategory(category);
    setShowView(true);
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

      <div className='d-flex justify-content-between position-relative align-items-center'>
        <div className='caption'>
          <h5 className='fw-medium'> Categories Table Details</h5>
          <p className='fw-light'>You can check all details</p>
        </div>
        <div className='end-0'>
          <button className='btn btn-success p-3 mt-4 mb-4' onClick={handleShowAdd}>Add New Categories</button>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header className='d-flex justify-content-between'> 
          <h5>Add Category</h5>
          <img role="button" src={closeButton} onClick={handleCloseAdd} alt="Close" />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitAdd)}>
            <div className="input-group mb-1 rounded-2">
              <input 
                className='input-style' 
                type="text" 
                placeholder='Category Name'
                aria-label="name" 
                {...register("name", { required: 'Category Name is required.' })}
              /> 
            </div>
            <div className='my-2'>                
              {errors.name && <span className='text-danger'>{errors.name.message}</span>}
            </div>
            <button className='btn btn-success p-2 mt-4 mb-2 w-100'> Save </button>
          </form>
        </Modal.Body>
      </Modal>   

      {/* Update Category Modal */}
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header className='d-flex justify-content-between'> 
          <h5>Update Category</h5>
          <img role="button" src={closeButton} onClick={handleCloseUpdate} alt="Close" />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className="input-group mb-1 rounded-2">
              <input 
                className='input-style' 
                type="text" 
                placeholder='Category Name'
                aria-label="name" 
                {...register("name", { required: 'Category Name is required.' })}
              /> 
            </div>
            <div className='my-2'>                
              {errors.name && <span className='text-danger'>{errors.name.message}</span>}
            </div>
            <button className='btn btn-success p-2 mt-4 mb-2 w-100'> Update </button>
          </form>
        </Modal.Body>
      </Modal>   

      {/* View Category Modal */}
      <Modal show={showView} onHide={handleCloseView}>
        <Modal.Header className='d-flex justify-content-between'> 
          <h5>View Category</h5>
          <img role="button" src={closeButton} onClick={handleCloseView} alt="Close" />
        </Modal.Header>
        <Modal.Body>
          {selectedCategory && (
            <>
              <p><strong>ID:</strong> {selectedCategory.id}</p>
              <p><strong>Name:</strong> {selectedCategory.name}</p>
              <p><strong>Creation Date:</strong> {selectedCategory.creationDate}</p>
            </>
          )}
        </Modal.Body>
      </Modal>

      <DeleteConfirmation 
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        deleteItem={'Category'}
        deleteFunction={deleteCategory}
      />

      <div className="w-100 rounded-5 py-4 px-5 mb-4 bg-secondary-subtle d-flex justify-content-between align-items-center">
        <h6>ID</h6>
        <h6>Name</h6>
        <h6>Creation Date</h6>
        <h6>Actions</h6>
      </div>

      <div>
        {categoriesList.length > 0 ? 
          <Table striped borderless hover>
            <tbody>
              {categoriesList.map((category) => (
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
                        <li><Link className="dropdown-item" onClick={() => handleShowView(category)} href="#"><img src={View} alt="" />View</Link></li>
                        <li><Link className="dropdown-item" onClick={() => handleShowUpdate(category)} href="#"><img src={Edit} alt="" />Edit</Link></li>
                        <li><Link className="dropdown-item" onClick={() => handleShowDelete(category.id)} href="#"><img src={Delete} alt="" />Delete</Link></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))} 
            </tbody>
          </Table>
        : <NoData/> }
      </div>
    </>
  )
}