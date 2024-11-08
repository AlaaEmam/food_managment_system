import Logo from '../../../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function ForgetPass() {
  const navigate = useNavigate();

  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', data);
      navigate('/login');
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred');
    }
  };

  // Show and Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return ( 
  <>
  <div className='auth-container'>
      <div className="container-fluid ">
        <div className="row vh-100 justify-content-center align-content-center">
          <div className="col-md-6 col-sm-6 bg-white rounded-2 px-5 py-3">
            <div> 
              <div className="logo-container text-center">
                  <img className='img-fluid w-55 mt-3' src={Logo} alt="" />            
              </div>
              <div className="title my-4">
                <h3> Reset  Password</h3>
                <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="col-lg-12 col-sm-12 ">
                {/* INPUT EMAIL */}
                <div className="input-group mb-1 rounded-2 ">
                        <span className="input-group-text">
                            <i className="fa-regular fa-envelope"></i>
                          </span>
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
                <div className='mb-3'>                
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                </div>
                  
                    {/* INPUT OTP */}
                <div className="input-group mb-1 rounded-2 ">
                        <span className="input-group-text">
                         <i className="fa-solid fa-key"></i>                          
                        </span>
                        <input 
                        type="text" 
                        className="input-style bg-transparent"
                        placeholder="OTP" 
                        aria-label="otp" 
                        aria-describedby="basic-addon1" 
                        {...register('seed', 
                          {
                            required: 'OTP is required. Please Enter Your OTP  or Check Your Inbox',
                            pattern: {
                              message: 'OTP is required. Please Enter Your OTP  or Check Your Inbox'
                          }
                        })}
                        />
                  </div>
                <div className='mb-3'>                
                  {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}
                </div>


                {/* INPUT NEW PASSWORD */}
                <div className="input-group mb-1 rounded-2">
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
                    {showPassword ? <i className="fa-solid fa-eye"></i> :  <i className="fa-solid fa-eye-slash"></i>}
                  </span>
                </div>
                <div className='mb-3'>                
                  {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                </div>

                {/* INPUT CONFIRM NEW PASSWORD */}
                <div className="input-group mb-1 rounded-2">
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
                    {showPassword ? <i className="fa-solid fa-eye"></i> :  <i className="fa-solid fa-eye-slash"></i>}
                    </span>
                </div>
                <div className='mb-3'>                
                  {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
                </div>


                  <button className='btn btn-success w-100 p-2 mt-4 mb-2 tex'>Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

