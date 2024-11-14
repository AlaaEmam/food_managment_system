import Navbar from './../Navbar/Navbar';
import Header from './../Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';

export default function MasterLayout({loginData}) {
  return (
    <div className='d-flex'>
      <div>
        <SideBar/>
      </div>
      <div className='w-100 p-3 mt-3'>
        <Navbar loginData={loginData}/>
        
        {/* showing  RecipesList - RecipeData - CategoriesList - CategoryData - UserList */}
        <Outlet/>  
      </div>
    </div>
  )
}
