 import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import avatar from '../../../../assets/userlist.png'
import axios from 'axios'
// import SmallHeader from '../../../shared/components/SmallHeader/SmallHeader'
import Table from 'react-bootstrap/Table'
import View from '../../../../assets/View.png'
import Edit from '../../../../assets/Edit.png'
import Delete from '../../../../assets/delete.png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation'
import NoData from './../../../shared/components/NoData/NoData';
import NoImage from '../../../../assets/noimg.jpg';
import { Modal } from 'react-bootstrap'
export default function RecipesList() {
  const [recipesList ,setRecipesList]= useState([]);
  const [selectedId ,setSelectedId] = useState(0);

  let getRecipesList = async() => {
    try{
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Recipe/`,
        {
          headers: {Authorization:localStorage.getItem("token")},
        }
      );
      setRecipesList(response.data.data)
    }catch(error){
     console.log(error);
    }
  }
  //Handle delete 
  let deleteRecipe = () =>{
    try{
        let response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedId}`,
          {
            headers: {Authorization:localStorage.getItem("token")},
          }
        );
        getRecipesList();
        toast.success("Operation completed successfully!");
      }catch(error){
        toast.error("An error occurred. Please try again."); // Handle errors
      }
      handleCloseDelete();
  };

// imageURL
const imageBaseURL = 'https://upskilling-egypt.com:3006'; // Set the base URL

  useEffect(() =>{
    getRecipesList()
  },[]);

  
  //Handle Modal Delete
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };
  //Handle Modal Add
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = (id) => {
    setSelectedId(id);
    setShowAdd(true);
  };

  
  

  return (
  <>
  <Header 
  title={'Recipes '} 
  textLight={'Items'} 
  description={'You can now add your items that any user can order it from the Application and you can edit'}
  img={<img src={avatar} alt="User Avatar" />}
  height={"170px"}
  />

{/* Small Header  */}
  <div className='d-flex justify-content-between position-relative align-items-center'>
            <div className='caption '>
              <h5 className='fw-medium'> Recipes Table Details</h5>
              <p className='fw-light'>You can check all details</p>
            </div>
            <div className='end-0'>
            <button className=' btn btn-success p-3 mt-4 mb-4' onClick={handleShowAdd} >Add New Recipes</button>
            </div>
  </div>
   {/* <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header >
        <img src={closeButton} onClick={handleCloseAdd} alt="" />
        </Modal.Header>
        <Modal.Body>
         <div className="text-center">
         <img src={character} alt="" />
          <h5 className='mt-4'>Add This Recipe </h5>
          <p className='text-muted'>are you sure you want to Add this item ? if you are sure just click on Add it</p>  
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
          className="btn-danger" 
         
          aria-hidden="true"
          >
          Add this Recipe
          </Button>
        </Modal.Footer>
      </Modal>  */}
{/* End Small Header  */}

  <div className="w-100 rounded-5 py-4 px-5 mb-4 bg-secondary-subtle d-flex justify-content-between align-items-center" >
    <h6>Item Name</h6>
    <h6>Image</h6>
    <h6>Price</h6>

    <h6>Description</h6>
    <h6>Category</h6>
    <h6>Action</h6>
  </div>

  <DeleteConfirmation 
    showDelete={showDelete}
    handleCloseDelete={handleCloseDelete}
    deleteItem={'Recipes'}
    deleteFunction={deleteRecipe}
    />

{recipesList.length > 0 ? 
  <Table striped borderless hover >
    <tbody>
    {recipesList.map((recipe) =>(
      <tr key={recipe.id}>

        <td>{recipe.name}</td>
        <td>  {recipe.imagePath ? (
            <img 
              src={`${imageBaseURL}/${recipe.imagePath}`} 
              alt={recipe.name} 
              style={{ width: '56px', height: '56px'}} 
            />
          ) : (
            <img src={NoImage} alt="Placeholder" style={{ width: '56px', height: '56px' }} />
          )}</td>
        <td>{recipe.price}</td>
        
        <td>{recipe.description}</td>
        <td>{recipe.category && recipe.category.length > 0 ? recipe.category[0].name : 'Default Category'}</td>
        <td> 
        <div className="dropdown">
          <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-solid fa-ellipsis text-success"></i>
          </div>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item"  onClick={handleShowDelete}  href="#"><img src={View} alt="" />View</Link></li>
            <li><Link className="dropdown-item"  onClick={handleShowDelete} href="#"><img src={Edit} alt="" />Edit</Link></li>
            <li><Link className="dropdown-item"  onClick={()=> handleShowDelete(recipe.id)} href="#"><img src={Delete} alt="" />Delete</Link></li>
          </ul>
        </div>
        </td>
      </tr>
    ))} 
    </tbody>
  </Table> : <NoData/> }
  </>
  )
}
