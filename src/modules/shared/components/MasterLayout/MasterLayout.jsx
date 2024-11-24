import Navbar from './../Navbar/Navbar';
import Header from './../Header/Header';
import { Outlet } from 'react-router-dom';
import LeftSideBar from './../LeftSideBar/LeftSideBar';

export default function MasterLayout({loginData}) {
  return (
    <div className='d-flex'>
      <div className="sidebar-container">
      <LeftSideBar/>
      </div>
      <div className='w-100 p-4 mt-3'>
        <Navbar loginData={loginData}/>
          {/* showing  RecipesList - RecipeData - CategoriesList - CategoryData - UserList */}
          <Outlet/>  
      </div>
    </div>
  )
}
