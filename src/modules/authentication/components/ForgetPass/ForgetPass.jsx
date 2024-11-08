import Logo from '../../../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgetPass() {
  const navigate = useNavigate(); 

  let { 
    register, //collect data and put data in email and password ---> register('email') 
    handleSubmit, //Handle when submit 
    formState: { errors } // get error massage
  } = useForm();

  const onSubmit = async (data) => {
    try{
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data);
      navigate('/reset-pass'); 
      toast.success(response.data.message);
      console.log(response.data.message);
      
    }catch(error){
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred'); // Handle errors
    }
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
                <h3>Login</h3>
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
                  

                  <button className='btn btn-success w-100 p-2 mt-4 mb-2 tex'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

