import React from 'react'
import Logo from '../../../../assets/logo.svg'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='auth-container'>
      <div className="container-fluid ">
        <div className="row vh-100 justify-content-center align-content-center">
          <div className="col-md-6 col-sm-6 bg-white rounded-2 px-5 py-3">
            <div> 
              <div className="logo-container text-center">
                  <img className='img-fluid w-55 mt-3' src={Logo} alt="" />            
              </div>
              <div className="title my-4">
                <h3>Login</h3>
                <p className='text-muted'>Welcome Back! Please enter your details</p>
              </div>
              <form action="">

                <div className="input-group mb-3 rounded-2 ">
                    <div className="input-group-prepend">
                      <span className="icon-input" id="basic-addon1">
                      <i className="fa-regular fa-envelope"></i>
                        </span>
                    </div>
                    <input 
                    type="text" 
                    className="input-style bg-transparent" 
                    placeholder="Enter your E-mail" 
                    aria-label="email" 
                    aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3 rounded-2">
                    <div className="input-group-prepend">
                      <span className="icon-input" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                        </span>
                    </div>
                    <input 
                    type="password" 
                    className="input-style bg-transparent" 
                    placeholder="Enter your password" 
                    aria-label="password" 
                    aria-describedby="basic-addon1"/>
                </div>
                  
                  <div className="links d-flex justify-content-between mb-3">
                    <Link to='register' className='text-dark text-monospace text-decoration-none '>Register Now?</Link>
                    <Link to='forget-pass' className='text-success text-decoration-none'> Forgot Password?</Link>
                  </div>
                  <button className='btn btn-success w-100 p-2 mt-4 mb-2 tex'> Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
