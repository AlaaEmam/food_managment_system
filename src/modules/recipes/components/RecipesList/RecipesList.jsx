 import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import avatar from '../../../../assets/userlist.png'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import View from '../../../../assets/View.png'
import Edit from '../../../../assets/Edit.png'
import Delete from '../../../../assets/delete.png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation'
import NoData from './../../../shared/components/NoData/NoData';
import closeButton from '../../../../assets/closeButton.png';
import NoImage from '../../../../assets/noimg.jpg';
import Pagination from '../../../shared/components/Pagination/Pagination'

export default function RecipesList() {
   // imageURL
  const imageBaseURL = 'https://upskilling-egypt.com:3006'; 
  const [recipesList ,setRecipesList]= useState([]);
  const [selectedId ,setSelectedId] = useState(0);
  const [tags, setTags] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const [showView, setShowView] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [catValue, setCatValue] = useState('');

  let getRecipesList= async(pageNo ,pageSize ,name ,tag ,category) => {
    try{
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Recipe/`,
        {
          headers: {Authorization:localStorage.getItem("token")},
          params: {
            pageSize: pageSize , 
            pageNumber: pageNo , 
            name: name , 
            tagId: tag , // tagId :params name in fillter api
            categoryId: category,
          }
        }
      );
      console.log(response.data.data);
      setRecipesList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    }catch(error){
     console.log(error);
    }
  };

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

  //Handle Get Tags 
  const getTags = async () => {
    try {
        const response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/tag/`);
        setTags(response.data);
        setTags(response.data);
    } catch (error) {
        console.log(error);
        toast.error('Failed to fetch tags');
    }
}; 

  useEffect(() =>{
    getRecipesList(1, 3);
    getTags();
    getCategoriesList();
  },[]);


  
  //Handle Modal Delete
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  //Modal View
  const handleCloseView = () => setShowView(false);

  const handleShowView = (recipe) => {
    setSelectedRecipe(recipe);
    setShowView(true);
  };

  // Handel Search input
  const getnameValue = (input) => {
  setNameValue(input.target.value);
  getRecipesList( 1 , 3 , input.target.value , tagValue ,catValue);
  };


  //Handel Filter by tag & category
  const getCategoryValue = (input) => {
  setCatValue(input.target.value);
  getRecipesList( 1 , 3 , nameValue , tagValue , input.target.value  );
  };

  const getTagValue = (input) => {
    setTagValue(input.target.value);
  getRecipesList( 1 , 3 , nameValue , input.target.value , catValue );
  };
  
  // Handel Pagination
  
  useEffect(() => {
    getRecipesList(currentPage, 3);
  }, [currentPage]);

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
    getRecipesList(pageNo, 3);
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
            <Link to='new-recipe' >
            <button className=' btn btn-success p-3 mt-4 mb-4' >Add New Recipe </button>
            </Link>
            </div>
  </div>

      {/* Fillter & Search  */}
      <div className="mb-4 d-flex">
      <div className="search-bar col-md-6 m-1">
        <input
          type="text"
          className="form-control"
          placeholder="Search here..."
          onChange={getnameValue}
        />
      </div>
      <div className="category-dropdown   m-1 col-md-3">
        <select className="form-select"  onChange={getCategoryValue}>
          <option value="">Category</option>
          {categoriesList.map((category) => (
            <option key={category.id} >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="tags-dropdown  m-1 col-md-3">
        <select className="form-select"   onChange={getTagValue}>
          <option value="">Tags</option>
          {tags.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
            ))}
        </select>
      </div>
    </div>

<DeleteConfirmation 
  showDelete={showDelete}
  handleCloseDelete={handleCloseDelete}
  deleteItem={'Recipes'}
  deleteFunction={deleteRecipe}
/>

{/* View user Modal */}
<Modal show={showView} onHide={handleCloseView} centered>
  <Modal.Header className='d-flex justify-content-between align-items-center'>
      <h5>View Recipe Data</h5>
      <img role="button" src={closeButton} onClick={handleCloseView} alt="Close" />
  </Modal.Header>
  <Modal.Body className="text-center">
      {selectedRecipe && (
          <>
            <div className="mb-4">
            {selectedRecipe.imagePath ? (
              <img 
              src={`${imageBaseURL}/${selectedRecipe.imagePath}`}
                alt={selectedRecipe.name} 
                style={{ width: '200px', height: '200px'}} 
              />
            ) : ( 
            <img src={NoImage} alt="Placeholder" style={{ width: '200px', height: '200px'}} />
            )}
            </div>
              <h6 className="mb-3"><strong>Recipe Name:</strong>{selectedRecipe.name}</h6>
              <h6 className="mb-3"><strong>Tag:</strong>{selectedRecipe.tag.name}</h6>
              <h6 className="mb-3"><strong>Description:</strong>{selectedRecipe.description} </h6> 
              <h6 className="mb-3"><strong>Category:</strong>{selectedRecipe.category && selectedRecipe.category.length > 0 ? selectedRecipe.category[0].name : 'Default Category'} </h6> 
              <h6 className="mb-3"><strong>Price:</strong> {selectedRecipe.price} Le</h6>
          </>
      )}
  </Modal.Body>
</Modal>


  <div className="w-100 rounded-5 py-4 px-5 mb-4 bg-secondary-subtle d-flex justify-content-between align-items-center" >
    <h6>Recipe Name</h6>
    <h6>Image</h6>
    <h6>Price</h6>
    <h6>Tag</h6>
    <h6>Description</h6>
    <h6>Category</h6>
    <h6>Action</h6>
  </div>


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
        <td>{recipe.price} LE</td>
        <td>{recipe.tag.name}</td>
        <td>{recipe.description}</td>
        <td>{recipe.category && recipe.category.length > 0 ? recipe.category[0].name : 'Default Category'}</td>
        <td> 
        <div className="dropdown">
          <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-solid fa-ellipsis text-success"></i>
          </div>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" onClick={() => handleShowView(recipe)} ><img src={View} alt="" />View</Link></li>
            <li><Link className="dropdown-item" to={`${recipe?.id}`} ><img src={Edit} alt="" />Edit</Link></li>
            <li><Link className="dropdown-item"  onClick={()=> handleShowDelete(recipe.id)} ><img src={Delete} alt="" />Delete</Link></li>
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
