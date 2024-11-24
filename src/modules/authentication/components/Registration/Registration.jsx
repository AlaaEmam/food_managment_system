import Logo from '../../../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import './Registration.css';
import defaultAvatar from '../../../../assets/defaultavatar.jpg'

export default function Registration() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultAvatar);


  const onSubmit = async (data) => {
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Register', data);
      navigate('/verification');
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data.message || 'An error occurred');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Create a URL for the uploaded image
    }
  };

  return (
    <>
      <div className='auth-container'>
        <div className="container-fluid">
          <div className="row vh-100 justify-content-center align-content-center">
            <div className="col-md-6 col-sm-6 bg-white rounded-2 px-5 py-3">
              <div className="logo-container text-center">
                <img className='img-fluid w-55 mt-3' src={Logo} alt="" />
              </div>
              <div className="title my-4">
                <h3>Register</h3>
                <p className='text-muted'>Welcome Back! Please enter your details.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="form-inputs col-lg-12 col-sm-12">
              {/* Handel Image  */}
              <div className="profile-image">
                  <img src={profileImage} alt="Profile Image" className="profile-image-preview" />
                  <input
                    type="file"
                    id="profileImageInput"
                    className="input-img bg-transparent"
                    placeholder="Upload Profile Image"
                    aria-label="Profile Image"
                    {...register('profileImage')}
                    onChange={handleProfileImageChange}
                  />
              <label htmlFor="profileImageInput" className="icon-profile">
                <i className="fa-solid fa-camera"></i>
              </label>
                </div>
                <div className='mb-3'>
                  {errors.profileImage && <span className='text-danger'>{errors.profileImage.message}</span>}
                </div>
                
                <div className="row mb-3 g-3"> 
                  {/* First Column */}
                  <div className='col-md-12 col-lg-6'>
                    {/* INPUT USER NAME */}
                    <div className="input-group mb-1 rounded-2 username">
                      <span className="input-group-text">
                        <i className="fa-regular fa-user"></i>
                      </span>
                      <input 
                        type="text" 
                        className="input-style bg-transparent"
                        placeholder="Enter your Username" 
                        aria-label="name" 
                        {...register('userName', {
                          required: 'Your Name is required. Please enter your Name.',
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]*\d$/,
                            message: 'Username must contain characters and end with numbers without spaces.'
                          }
                        })}
                      />
                    </div>
                    <div className='mb-3'>
                      {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
                    </div>

                    {/* INPUT COUNTRY */}
                    <div className="input-group mb-1 rounded-2 country">
                      <span className="input-group-text">
                        <i className="fa-solid fa-globe"></i>
                      </span>
                      <input 
                        type="text" 
                        className="input-style bg-transparent"
                        placeholder="Country" 
                        aria-label="Country" 
                        {...register('country')}
                      />
                    </div>
                    <div className='mb-3'>
                      {errors.country && <span className='text-danger'>{errors.country.message}</span>}
                    </div>

                    {/* INPUT NEW PASSWORD */}
                    <div className="input-group mb-1 rounded-2 password">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        className="input-style"
                        placeholder="New Password"
                        aria-label="password" 
                        {...register('password', {
                          required: 'Password is required.',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long'
                          }
                        })}
                      />
                      <span 
                        className="input-group-text icon-showpass" 
                        onClick={togglePasswordVisibility} 
                        style={{ cursor: 'pointer' }}>
                        {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                      </span>
                    </div>
                    <div className='mb-3'>
                      {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                    </div>
                  </div>

                  {/* Second Column */}
                  <div className='col-md-12 col-lg-6'>
                    {/* INPUT EMAIL */}
                    <div className="input-group mb-1 rounded-2 email">
                      <span className="input-group-text">
                        <i className="fa-regular fa-envelope"></i>
                      </span>
                      <input 
                        type="text" 
                        className="input-style bg-transparent"
                        placeholder="Enter your E-mail" 
                        aria-label="email" 
                        {...register('email', {
                          required: 'Email is required. Please enter your email address.',
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter a valid email address like this (user@example.com)'
                          }
                        })}
                      />
                    </div>
                    <div className='mb-3'>
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    </div>

                    {/* INPUT PHONE NUMBER */}
                    <div className="input-group mb-1 rounded-2 phone">
                      <span className="input-group-text">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      <input 
                        type="text" 
                        className="input-style bg-transparent"
                        placeholder="Phone Number" 
                        aria-label="Phone Number" 
                        {...register('phoneNumber', {
                          pattern: {
                            value: /^01[0-9]{9}$/,
                            message: 'Phone number must start with 01 and contain 11 digits.'
                          }
                        })}
                      />
                    </div>
                    <div className='mb-3'>
                      {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
                    </div>

                    {/* INPUT CONFIRM NEW PASSWORD */}
                    <div className="input-group mb-1 rounded-2 confirm-password">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        className="input-style"
                        placeholder="Confirm New Password"
                        aria-label="password" 
                        {...register('confirmPassword', {
                          required: 'Confirm Password is required.',
                          minLength: {
                            value: 6,
                            message: 'Confirm Password must be at least 6 characters long'
                          }
                        })}
                      />
                      <span 
                        className="input-group-text icon-showpass" 
                        onClick={togglePasswordVisibility} 
                        style={{ cursor: 'pointer' }}>
                        {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                      </span>
                    </div>
                    <div className='mb-3'>
                      {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
                    </div>
                  </div>
                </div>
                <button className='btn btn-success w-100 p-2 mt-4 mb-2'>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}