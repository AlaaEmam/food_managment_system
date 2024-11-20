import Logo from '../../../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function VerificationRegister() {

  const navigate = useNavigate(); 

  let { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    try{
      let response = await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/ ', data);
      navigate('/login'); 
      toast.success(response.data.message);
      console.log(response.data.message);
      
    }catch(error){
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred'); // Handle errors
    }
  };

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
              <h3>Verification Code to Confirm your Register</h3>
              <p className='text-muted'>Welcome Back! Please enter your details</p>
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
                
                 {/* INPUT Verification code */}
              <div className="input-group mb-1 rounded-2 ">
                      <span className="input-group-text">
                      <i className="fa-solid fa-key"></i>    
                        </span>
                      <input 
                      type="text" 
                      className="input-style bg-transparent"
                      placeholder="Enter your Verification Code" 
                      aria-label="code" 
                      aria-describedby="basic-addon1" 
                      {...register('code', 
                        {
                          required: 'OTP is required. Please Enter Your OTP  or Check Your Inbox.',
                          pattern: {
                              message: 'OTP is required. Please Enter Your OTP  or Check Your Inbox'
                          }
                      })}
                      />
                </div>
          
              <div className='mb-3'>                
                {errors.code && <span className='text-danger'>{errors.code.message}</span>}
              </div>

                <button className='btn btn-success w-100 p-2 mt-4 mb-2 tex'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}
