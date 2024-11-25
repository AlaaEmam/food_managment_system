import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import './RecipeForm.css';
import { FloatingLabel } from 'react-bootstrap';


export default function RecipeForm() {
    const { register, handleSubmit, formState: { isSubmitting, errors }, setError , setValue } = useForm({ mode: "onChange" });
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState(null); // State to hold the selected file
    const [categoriesList, setCategoriesList] = useState([]);
    const [imageFile, setImageFile] = useState(null); // State for image preview
    const [imageName, setImageName] = useState(''); // State for image name
    const [uploadSuccess, setUploadSuccess] = useState(false); // State for upload success message
    const navigate = useNavigate();
    const params = useParams();
    const recipeId = params.recipeId;

    const onSubmitHandler = async (data) => {
        const formData = new FormData();
        
        // Append the image file if available
        if (file) {
            formData.append('recipeImage', file);
        }

        // Append other form fields
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        try {
            let response;
            if (recipeId !== "new-recipe") {
                // Update existing recipe
                response = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`, formData, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem("token") 
                    }
                });
                toast.success("Recipe updated successfully!");
            } else {
                // Create new recipe
                response = await axios.post(`https://upskilling-egypt.com:3006/api/v1/Recipe/`, formData, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem("token") 
                    }
                });
                toast.success("Recipe saved successfully!");
            }
            navigate('/dashboard/recipes');
            console.log(response);
            
            
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'An error occurred');
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

    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/tag/`);
                setTags(response.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch tags');
            }
        };
        // Edit Recipe Data
        if (recipeId !== "new-recipe") {
            const getRecipe = async () => {
                try {
                    const response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`);
                    console.log(response);
                    // Handle the recipe data Set values we Have
                    const recipe = response?.data;

                    setValue("name" , recipe?.name);
                    setValue("price" , recipe?.price);
                    setValue("tagId" , recipe?.tag?.id);
                    setValue("categoriesIds" , recipe?.category?.[0].id);
                    setValue("description" , recipe?.description);
                  

                } catch (error) {
                    console.error("Failed to fetch recipe:", error);
                }
            };
            getRecipe();
            getTags();
            getCategoriesList();    
        }
    }, [recipeId ,setValue]);

    // Handel Reload and Close browser
    useEffect(()=>{
        const beforeUnloadHandler =(e) => {
            e.preventDefault();
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);
        // return() =>
        //     window.removeEventListener("beforeunload" , beforeUnloadHandler);
    },[]);

    const onDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setImageFile(URL.createObjectURL(droppedFile)); // Set image preview
            setImageName(droppedFile.name); // Set image name
            setUploadSuccess(true); // Set success message
            setError("recipeImage", { type: "manual" }); // Clear error manually
        }
    };

    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImageFile(URL.createObjectURL(selectedFile)); // Set image preview
            setImageName(selectedFile.name); // Set image name
            setUploadSuccess(true); // Set success message
            setError("recipeImage", { type: "manual" }); // Clear error manually
        }
    };

    return (
        <>
            {/* <div>recipe id: {params.recipeId}</div> */}
            <div className='dashboard-container py-4 px-4 d-flex justify-content-between position-relative align-items-center'>
                <div className='caption'>
                    <h3 className='fw-bold'>Fill the <span className='fw-normal text-success'>Recipes</span>!</h3>
                    <p className='fw-light'>You can now fill the meals easily using the table and form, click here and fill it with the table!</p>
                </div>
                <div className='end-0'>
                    <Link to='/dashboard/recipes'>
                        <button className='btn btn-success py-2 px-3'>
                            View All Recipes
                            <i className="fa-solid fa-arrow-right px-1"></i>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Form  */}
            <Form onSubmit={handleSubmit(onSubmitHandler)} className='px-5 py-3 mb-3'>
                <Form.Group className="mb-3" controlId="formGridName">
                <FloatingLabel controlId="floatingName" label="Recipe Name">
                    <Form.Control 
                        placeholder="Recipe Name" 
                        type="text" 
                        aria-label="name" 
                        {...register("name", { required: 'Recipe Name is required.' })} 
                    />
                </FloatingLabel>
                    <div className='my-1'>
                        {errors?.name && <span className='text-danger'>{errors.name.message}</span>}
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPrice">
                <FloatingLabel controlId="floatingPrice" label="Price">
                    <Form.Control 
                        placeholder="Price" 
                        type="number" 
                        min='0' 
                        aria-label="price" 
                        {...register("price", { required: 'Price is required.' })} 
                    />
                </FloatingLabel>
                    <div className='my-1'>
                        {errors?.price && <span className='text-danger'>{errors.price.message}</span>}
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridTag">
                <FloatingLabel
                     controlId="floatingSelectGrid"
                     label="Tags">

                    <Form.Select 
                        aria-label="Tag" 
                        {...register("tagId", { required: 'Tag Name is required.' })} 
                    >
                        <option>Choose Tags...</option>
                        {tags.map(({ id, name }) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </Form.Select>
                    </FloatingLabel>
                    <div className='my-1'>
                        {errors?.tagId && <span className='text-danger'>{errors.tagId.message}</span>}
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridCategories">
                    <FloatingLabel
                     controlId="floatingSelectGrid"
                     label="Categories">
                    <Form.Select 
                        aria-label="categoriesIds" 
                        {...register("categoriesIds", { required: 'Categories are required.' })} 
                    >
                        <option>Choose Categories...</option>
                        {categoriesList.map(({ id, name }) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </Form.Select>
                    </FloatingLabel>
                    <div className='my-1'>
                        {errors.categoriesIds?.message && <span className='text-danger'>{errors.categoriesIds.message}</span>}
                    </div>
                </Form.Group>

                <div className='mb-3'>
                <FloatingLabel controlId="floatingDescription" label="Description">
                    <Form.Control 
                        className="mb-1" 
                        as="textarea" 
                        placeholder="Description" 
                        {...register("description", { required: 'Description is required.' })} 
                    />
                    </FloatingLabel>
                    {errors.description?.message && <span className='text-danger'>{errors.description.message}</span>}
                </div>

                {/* Input image */}
                <div 
                    className="card-img d-flex justify-content-center mb-4 border border-2 border-dashed rounded-3 p-5 w-100"
                    onDrop={onDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById('formFile').click()} // Click to upload
                >
                    <div className="text-center">
                        <i className="fas fa-upload fa-2x text-success mb-3"></i>
                        <p className="mb-0">Drag & Drop or <a href="#" className="text-success text-decoration-none">Choose an Item Image</a> to Upload</p>
                    </div>
                </div>

                <input 
                    className="form-control" 
                    type="file" 
                    id="formFile" 
                    {...register("recipeImage", { required: 'Image is required.' })} 
                    onChange={onFileChange} // Handle file change
                    style={{ display: 'none' }} // Hide the default file input
                />
                {errors.recipeImage && <span className='text-danger'>{errors.recipeImage.message}</span>}
             
                {imageFile && (
                    <div className="mt-4 text-center">
                        <img src={imageFile} alt={imageName} className="img-fluid mb-2" style={{ maxHeight: '200px' }} />
                        <p>{imageName}</p>
                        {uploadSuccess && <span className='text-success'>Image uploaded successfully!</span>}
                    </div>
                )}
                
                <hr />

                <div className='mt-4 d-flex justify-content-end'>
                    <Link to="/dashboard/recipes">
                        <Button className='px-5 py-2 mx-2' variant="outline-success">Cancel</Button>
                    </Link>
                    <Button className='px-5 py-2 mx-2' disabled={isSubmitting} variant="success" type="submit">
                        {isSubmitting ? "Saving" : "Save"}
                    </Button>
                </div>
            </Form>
        </>
    );
}