import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import Login from './modules/authentication/components/Login/Login';
import Registration from './modules/authentication/components/Registration/Registration';
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass';
import ResetPass from './modules/authentication/components/ResetPass/ResetPass';
import NotFound from './modules/shared/components/NotFound/NotFound';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard';
import RecipesList from './modules/recipes/components/RecipesList/RecipesList';
import CategoriesList from './modules/categories/components/CategoriesList/CategoriesList';
import UserList from './modules/users/components/UserList/UserList';
import VerificationRegister from './modules/authentication/components/VerificationRegister/VerificationRegister';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import RecipeForm from './modules/recipes/components/RecipeForm/RecipeForm';


function App() {


  // Function decode Token 
 const [loginData, setLoginData] = useState(null); 
 //output :setLoginData=null --> not logged in user 
 //output :setLoginData= encodedToken -->  logged in user 
  let saveLoginData = () =>{
    let decodeedToken = localStorage.getItem("token");
    let encodedToken = jwtDecode(decodeedToken);
    // console.log(encodedToken);
    setLoginData(encodedToken);
  }


  // if i refresh browers after login the data will be null 
  useEffect(()=>{
    if(localStorage.getItem('token')) //if logged in after refresh and you make sure this user login 
    saveLoginData(); // get data of this user
  } ,[])

  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout/>, 
      errorElement: <NotFound/>,
      children:[
        {index: true ,element: <Login saveLoginData={saveLoginData}/>},
        {path: 'login' ,element: <Login saveLoginData={saveLoginData}/>},
        {path: 'register' ,element:<Registration/>},
        {path: 'forget-pass' ,element:<ForgetPass/>},
        {path: 'reset-pass' ,element:<ResetPass/>},
        {path: 'verification' ,element:<VerificationRegister/>}
      ]
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute loginData={loginData}>
        <MasterLayout loginData={loginData} />
      </ProtectedRoute>
      ),
      errorElement: <NotFound/>,
      children:[
        {index: true ,element: <Dashboard loginData={loginData}/>},
        {path: 'recipes' ,element: <RecipesList loginData={loginData}/>},
        {path: 'recipes/new-recipe' ,element:<RecipeForm loginData={loginData}/>},
        {path: 'recipes/:recipeId' ,element:<RecipeForm loginData={loginData}/>},
        {path: 'categories' ,element:<CategoriesList loginData={loginData}/>},
        {path: 'users' ,element:<UserList/>},
      ]
    }
  ])

  return (
    <>
    <ToastContainer/>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
