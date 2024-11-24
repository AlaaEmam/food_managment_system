import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import ExpandedLogo from '../../../../assets/logo_sidebar.png'
import CollapsedLogo from '../../../../assets/collapselogo.png'
import { useState } from 'react';
import './LeftSideBar.css';

export default function LeftSideBar() {

  const [isCollapse ,setIsCollapse] =useState(false);
  let toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };


  return (
  <>

  <Sidebar collapsed={isCollapse}>
      <Menu>
        <MenuItem
        onClick={toggleCollapse}
        icon={
          isCollapse ? 
          <img src={CollapsedLogo} alt="Collapsed Logo" /> : 
          <img src={ExpandedLogo} alt="Expanded Logo" />
        }       
        className={`logo-menu-item sidebar-logo ${isCollapse ? 'collapsed' : 'expanded'}`} 
        >
        </MenuItem>

        <MenuItem 
        icon={<i className="fa-solid fa-shop mx-3"></i>}
        component={<Link to='/dashboard'/>}> 
        Home 
        </MenuItem>

        <MenuItem 
        icon={<i className="fa-solid fa-users mx-3"></i>}
        component={<Link to='users'/>}> 
        Users </MenuItem>

        <MenuItem 
        icon={<i className="fa-solid fa-cubes-stacked mx-3"></i>}
        component={<Link to='recipes'/>}>
        Recipes 
        </MenuItem>

        <MenuItem 
        icon={<i className="fa-solid fa-calendar-week mx-3"></i>}
        component={<Link to='categories'/>}> 
        Categories 
        </MenuItem>
        
        <MenuItem 
        icon={<i className="fa-solid fa-unlock-keyhole mx-3"></i>}
        component={<Link to='#'/>}> 
        Change Password 
        </MenuItem>
        
        <MenuItem
        icon={<i className="fa-solid fa-right-to-bracket mx-3"></i>}
        component={<Link to='/login'/>}> 
        Logout 
        </MenuItem>
  
      </Menu>
    </Sidebar> 
</>
)}
