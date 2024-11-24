import { useState } from 'react'
import './Navbar.modules.css';
import avatar from '../../../../assets/avatar.png';


export default function Navbar({loginData ,profileImage}) {

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }


  return (
    <>
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="mr-auto ">
            <div className="input-group mb-1 rounded-pill">
                    <span className="input-group-text search-icon">
                     <i className="fas fa-search"></i>
                    </span>
                    <input 
                      type="text"
                      className="input-style"
                      placeholder="Search Here"
                      aria-label="email" 
                      value={searchText}
                    onChange={handleSearchChange}
                    />
            </div>
        </div>
        <div className="navbar-nav ">
          <div className="nav-item mx-5 d-flex align-items-center ">
             <img className="avatar" src={profileImage || avatar} alt="user avatar" />
              <span className="navbar-text mx-2  fw-bold ">{loginData?.userName}</span>
          </div>
         
          <div  className="av-item d-flex align-items-center position-relative">
          <i className="fas fa-bell"></i>
           <span className="position-absolute top-1 start-1 translate-middle badge border border-light rounded-circle bg-danger p-1">
            <span className="visually-hidden">unread messages</span></span>
          </div>

        </div>
      </div>
    </nav>
    </>
  )
}
