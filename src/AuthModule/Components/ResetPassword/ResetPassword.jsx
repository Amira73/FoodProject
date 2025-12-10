import React from 'react'
import logo from '../../../assets/images/1.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function ResetPassword() {

 const {register, formState:{errors},handleSubmit,watch,}=useForm()
  let navigate=useNavigate()
   const password = watch("password");
  const onSubmit=async (data)=>{
try{
  const response= await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data)
  console.log(response)
   toast.success("mabrooooooooooook 3mlna reset password");
  navigate('/login')


}
catch(error){
  
 console.log(error.response.data.message)
 toast.error("m3rfnaa4 n3ml reset password");
}
  }
  return (
    <>
  <div className="auth-container">
      <div className="container-fluid bg-overlay ">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <div className="col-11 col-sm-11 col-md-8 col-lg-7 col-xl-5  bg-white rounded-3 m-3">
  
            <div className="form-container m-3 ">
      <div className="logo-container text-center">
        <img src={logo} alt="img" className='img-fluid w-35'></img>
      </div>
      <div className="title-container">
        <h4 className='text-small'> Reset  Password</h4>
        <p className='text-muted color-text2 small'>Please Enter Your Otp  or Check Your Inbox </p>
      </div>
  <form onSubmit={handleSubmit(onSubmit)}>
  

  {/* Email */}
  <div className="input-group my-2">
    <span className="input-group-text" id="basic-addon-email">
      <i className="fa-regular fa-envelope"></i>
    </span>
    <input
      type="text"
      {...register("email", {
        required: "user name is required",
      })}
      className="form-control text-color"
      placeholder="Enter Your E-mail"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </div>
  {errors.email && <p className="alert alert-danger">{errors.email.message}</p>}

  {/* OTP */}
  <div className="input-group my-2">
    <span className="input-group-text" id="basic-addon-email">
      <i className="fa-solid fa-lock"></i>
    </span>
    <input
      type="text" 
      {...register("seed", {
        required: "OTP is required",
      })}
      className="form-control text-color"
      placeholder="OTP"
      aria-label="OTP"
      aria-describedby="basic-addon1"
    />
  </div>
  {errors.seed && <p className="alert alert-danger">{errors.seed.message}</p>}

  {/* Password */}
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

  {/* Confirm Password */}
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



  
  <button type="submit" className="btn btn-success  w-100 m-auto ">
    Reset Password
  </button>
  
  
  </form>
    
  
  
  
  
  
    
            </div>
  
  
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
