import React from 'react'
import logo from '../../../assets/images/1.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function Register() {
  
 const {register, formState:{errors},handleSubmit,watch}=useForm()
  let navigate=useNavigate()
   const password = watch("password");
  const onSubmit=async (data)=>{
try{
  const response= await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Register",data)
  console.log(response)
   toast.success("mabrooooooooooook 3mlna Register");
  navigate('/login')


}
catch(error){
  
 console.log(error.response.data.message)
 toast.error("m3rfnaa4 n3ml Register");
}
  }
  return (
       <>
      <div className="auth-container">
          <div className="container-fluid bg-overlay ">
            <div className="row min-vh-100 justify-content-center align-items-center">
              <div className="col-11 col-sm-11 col-md-8 col-lg-7 col-xl-6  bg-white rounded-3 m-3">
      
                <div className="form-container m-3 ">
          <div className="logo-container text-center">
            <img src={logo} alt="img" className='img-fluid w-35'></img>
          </div>
          <div className="title-container">
            <h4 className='text-small'>Register</h4>
            <p className='text-muted color-text2 small'>Welcome Back! Please enter your details </p>
          </div>
      <form onSubmit={handleSubmit(onSubmit)}>
              <div className="container">
                <div className="row">
                 
                  <div className="col-md-6">
                   <div class="input-group my-2">
     <span className="input-group-text" id="basic-addon-email">
      <i class="fa-solid fa-mobile-screen"></i>
    
    </span>
    <input type="text" 
    
    {...register('userName' ,{
     required:"user name is required",
    //  pattern: {
    //                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //                           message: "Enter a valid email address",
    //                         },
  
    })}
    className="form-control text-color" placeholder="User Name" aria-label="Username" aria-describedby="basic-addon1"/>
  </div>
   {errors.userName && <p className='alert alert-danger'>{errors?.userName.message}</p>}
       <div class="input-group my-2">
     <span className="input-group-text" id="basic-addon-email">
      <i class="fa-solid fa-mobile-screen"></i>
    
    </span>
    <input type="text" 
    
    {...register('country' ,{
     required:"Country is required",
    //  pattern: {
    //                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //                           message: "Enter a valid email address",
    //                         },
  
    })}
    className="form-control text-color" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1"/>
  </div>
   {errors.country && <p className='alert alert-danger'>{errors?.country.message}</p>}

                    <div className="input-group my-2">
    <span className="input-group-text" id="basic-addon-password">
      <i className="fa-solid fa-lock"></i>
    </span>
    <input
      {...register("password", {
        required: "password is required",
      })}
      type="password"
      className="form-control text-color"
      placeholder="Password"
      aria-label="Password"
      aria-describedby="basic-addon-password"
    />
  </div>
  {errors.password && (
    <p className="alert alert-danger">{errors.password.message}</p>
  )}
                  </div>

                  {/* العمود الثاني */}
                  <div className="col-md-6">
                    <div className="input-group my-2">
    <span className="input-group-text" id="basic-addon-email">
      <i className="fa-regular fa-envelope"></i>
    </span>
    <input
      type="text"
      {...register("email", {
        required: "Mail is required",
      })}
      className="form-control text-color"
      placeholder="Enter Your E-mail"
      aria-label="mail"
      aria-describedby="basic-addon1"
    />
  </div>
  {errors.email && <p className="alert alert-danger">{errors.email.message}</p>}

                    <div className="input-group my-2">
    <span className="input-group-text" id="basic-addon-email">
      <i className="fa-regular fa-envelope"></i>
    </span>
    <input
      type="number"
      {...register("phoneNumber", {
        required: "Phone is required",
      })}
      className="form-control text-color"
      placeholder="Phone"
      aria-label="Phone"
      aria-describedby="basic-addon1"
    />
  </div>
  {errors.phoneNumber && <p className="alert alert-danger">{errors.phoneNumber.message}</p>}

                   <div className="input-group my-2">
    <span className="input-group-text" id="basic-addon-password">
      <i className="fa-solid fa-lock"></i>
    </span>
    <input
      {...register("confirmPassword", {
        required: "Confirm password is required",
        validate: value => value === password || "Passwords do not match"
      })}
      type="password"
      className="form-control text-color"
      placeholder="Confirm password"
      aria-label="Confirm password"
      aria-describedby="basic-addon-password"
    />
  </div>
  {errors.confirmPassword && (
    <p className="alert alert-danger">{errors.confirmPassword.message}</p>
  )}
                  </div>
                </div>
              </div>

             <div className="links d-flex justify-content-end mx-3 my-1">
              
               <Link to='/login' className='text-success text-decoration-none'>Login Now ?</Link>
             
             </div>
<div className="btn-container text-center my-2">
    <button type="submit" className="btn btn-success  w-50 m-auto ">
    Register
  </button>
</div>

            </form>
        
      
      
      
      
      
        
                </div>
      
      
              </div>
            </div>
          </div>
        </div>
        </>
  )
}
