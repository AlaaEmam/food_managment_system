import React from 'react'
import { useParams } from 'react-router-dom'

 const RecipeForm = () =>{
    const params = useParams();
    console.log(params);
    return <div>recipe id : {params.recipeId}</div>
 } 

 export default RecipeForm ;