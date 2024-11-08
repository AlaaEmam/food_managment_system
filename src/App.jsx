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
import RecipeData from './modules/recipes/components/RecipeData/RecipeData';
import CategoriesList from './modules/categories/components/CategoriesList/CategoriesList';
import CategoryData from './modules/categories/components/CategoryData/CategoryData';
import UserList from './modules/users/components/UserList/UserList';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout/>, 
      errorElement: <NotFound/>,
      children:[
        {index: true ,element: <Login/>},
        {path: 'login' ,element: <Login/>},
        {path: 'register' ,element:<Registration/>},
        {path: 'forget-pass' ,element:<ForgetPass/>},
        {path: 'reset-pass' ,element:<ResetPass/>},
      ]
    },
    {
      path: 'dashboard',
      element: <MasterLayout/>, 
      errorElement: <NotFound/>,
      children:[
        {index: true ,element: <Dashboard/>},
        {path: 'recipes' ,element: <RecipesList/>},
        {path: 'recipe-data' ,element:<RecipeData/>},
        {path: 'categories' ,element:<CategoriesList/>},
        {path: 'category-data' ,element:<CategoryData/>},
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
