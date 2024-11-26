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
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation'
import NoData from './../../../shared/components/NoData/NoData';
import NoImage from '../../../../assets/noimg.jpg';

export default function RecipesList() {
   // imageURL
  const imageBaseURL = 'https://upskilling-egypt.com:3006'; // Set the base URL
  const [recipesList ,setRecipesList]= useState([]);
  const [selectedId ,setSelectedId] = useState(0);
  const [tags, setTags] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showView, setShowView] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [catValue, setCatValue] = useState('');

  let getRecipesList = async(pageNo ,pageSize ,name ,tag ,category) => {
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
      setArrayOfPages(Array.from( { 
        length: Math.min(3, response.data.totalNumberOfPages) }, 
        (_, i) => i + 1));

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

  // Handel Search input
  const getnameValue = (input) => {
  setNameValue(input.target.value);
  getRecipesList( 1 , 3 , input.target.value , tagValue ,catValue);
  };


  //Hnadel Fillter by tag & category
  const getCategoryValue = (input) => {
  setCatValue(input.target.value);
  getRecipesList( 1 , 3 , nameValue , tagValue , input.target.value  );
  };

  const getTagValue = (input) => {
    setTagValue(input.target.value);
  getRecipesList( 1 , 3 , nameValue , input.target.value , catValue );
  };
  
  //Modal View
  const handleCloseView = () => setShowView(false);
  const handleShowView = (user) => {
    setSelectedRecipe(recipe);
    setShowView(true);
  };

  useEffect(() => {
    getRecipesList(currentPage);
  }, [currentPage]);

  const handlePageClick = (pageNo) => {
    setCurrentPage(pageNo);
    getRecipesList(pageNo);
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


    {/* <div class="mb-4 d-flex "><div class=" col-md-6 search-bar "><input type="text" class=" form-control" placeholder="Search here..."></div><div class="category-dropdown mr-2 col-md-3"><select class="form-select"><option value="">Category</option><option>Electronics</option><option>Car</option><option>new</option><option>american</option><option>American</option><option>indian</option><option>Pizza</option><option>Pizza</option><option>sweet</option><option>pastaaaa</option></select></div><div class="tags-dropdown mr-2  col-md-3"><select class="form-select"><option value="">Tags</option><option value="1">Appetizer</option><option value="2">Dessert</option><option value="3">Snack</option><option value="4">Vegetarian</option><option value="5">Spicy</option><option value="6">Organic</option></select></div></div> */}

  <div className="w-100 rounded-5 py-4 px-5 mb-4 bg-secondary-subtle d-flex justify-content-between align-items-center" >
    <h6>Item Name</h6>
    <h6>Image</h6>
    <h6>Price</h6>
    <h6>Tag</h6>
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
        <td>{recipe.tag.name}</td>
        <td>{recipe.description}</td>
        <td>{recipe.category && recipe.category.length > 0 ? recipe.category[0].name : 'Default Category'}</td>
        <td> 
        <div className="dropdown">
          <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-solid fa-ellipsis text-success"></i>
          </div>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" ><img src={View} alt="" />View</Link></li>
            <li><Link className="dropdown-item" to={`${recipe?.id}`} ><img src={Edit} alt="" />Edit</Link></li>
            <li><Link className="dropdown-item"  onClick={()=> handleShowDelete(recipe.id)} ><img src={Delete} alt="" />Delete</Link></li>
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
