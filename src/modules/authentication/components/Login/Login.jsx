import React, { useState } from 'react'
import Logo from '../../../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';

import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate(); 

  let { 
    register, //collect data and put data in email and password ---> register('email') 
    handleSubmit, //Handle when submit 
    formState: { errors } // get error massage
  } = useForm();

  const onSubmit = async (data) => {
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data);
      navigate('/dashboard'); 
      toast.success("Login Successfly")
      console.log(response);
      
    }catch(error){
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred'); // Handle errors
    }
      // show data after form submission
      // console.log(data);
  };

  // Show and Hide Password
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  return ( <>
 
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

              <form onSubmit={handleSubmit(onSubmit)} className="col-lg-12 col-sm-12 " action="">
                {/* INPUT EMAIL */}
                <div className="input-group mb-1 rounded-2 ">
                  <div className="left">
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
                        aria-describedby="basic-addon1" 
                        {...register('email', 
                          {
                            required: 'Email is required. Please enter your email address.',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Please enter a valid email address like this (user@example.com)'
                            }
                        })}
                        />
                  </div>
                </div>
                <div className='mb-3'>                
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                </div>

                {/* INPUT PASSWORD */}
                <div className="input-group mb-1 rounded-2">
                    <div className='left'>
                        <div className="input-group-prepend">
                        <span className="icon-input" id="basic-addon1">
                        <i className="fa-solid fa-lock"></i>
                          </span>
                      </div>
                      <input 
                      type={ showPassword ? 'text' : 'password'}
                      className="input-style bg-transparent" 
                      placeholder="Enter your password" 
                      aria-label="password" 
                      aria-describedby="basic-addon1"
                      {...register('password' ,
                        {
                          required: 'Password is required. Please enter your Password.',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long'
                        }}
                      )}
                      />
                    </div>
                     <div className="input-group-prepend ">
                        <span className="icon-showpass" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                            {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </span>
                    </div>
                </div>
               
                <div className='mb-3'>                
                  {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                </div>
                  
                  <div className="links d-flex justify-content-between mb-3">
                    <Link to='register' className='text-dark text-monospace text-decoration-none font-weight-bold'>Register Now?</Link>
                    <Link to='forget-pass' className='text-success text-decoration-none'> Forgot Password?</Link>
                  </div>
                  <button className='btn btn-success w-100 p-2 mt-4 mb-2 tex'> Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
