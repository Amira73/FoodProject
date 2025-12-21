import React from 'react'
import logo from '../../../assets/images/1.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useAuth } from '../../../Context/AuthContext'
import { useState } from 'react'
import { http } from '../../../Api/Httpinstance'


export default function Login() {

   const { savaLoginData , loginData, isAuthenticated} = useAuth()
  const {register, formState:{errors},handleSubmit}=useForm()
  const [showPassword, setShowPassword] = useState(false);
  let navigate=useNavigate()
  const onSubmit=async (data)=>{
try{
  const response= await http.post("/Users/Login",data)
 console.log("SUCCESS:", response.data);
  localStorage.setItem("token", response.data.token);
    savaLoginData()
   console.log("LOGIN DATA:", loginData);
  toast.success("mabrooooooooooook 3mlna login");
  navigate('/dashboard')
}
catch(error){
   console.log("ERROR OBJECT:", error);
    console.log("ERROR RESPONSE:", error.response?.data);
 console.log(error.response.data.message)
toast.error(`m3rfnaa4 n3ml login - ${error.response.data.message}`);
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
      <h4>Log In</h4>
      <p className='text-muted color-text2'>Welcome Back! Please enter your details</p>
    </div>
<form onSubmit={handleSubmit(onSubmit)}>

<div class="input-group mb-3">
   <span className="input-group-text" id="basic-addon-email">
    <i class="fa-solid fa-mobile-screen"></i>
  
  </span>
  <input type="text" 
  
  {...register('email' ,{
   required:"user name is required",
  //  pattern: {
  //                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  //                           message: "Enter a valid email address",
  //                         },

  })}
  className="form-control text-color" placeholder="Enter Your E-mail" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
 {errors.email && <p className='alert alert-danger'>{errors?.email.message}</p>}


<div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon-password">
     <i class="fa-solid fa-lock"></i>
  </span>
  <input
  className="text-color"
  
   {...register('password',{
    required:"password is required",
    //  pattern: {
    //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]{8,}$/,
    //   message:
    //     "Password must be 8+ chars and include upper, lower, number, and symbol",
    // },
   })}
  type={showPassword ? "text" : "password"} class="form-control" placeholder="password" aria-label="Username" aria-describedby="basic-addon1"/>
    <button
    type="button"
    className="input-group-text"
    onClick={() => setShowPassword((s) => !s)}
    aria-label={showPassword ? "Hide password" : "Show password"}
    style={{ cursor: "pointer" }}
  >
    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
  </button>
</div>
 {errors.password && <p className='alert alert-danger'>{errors?.password.message}</p>}
<div className="links d-flex justify-content-between m-2">
  <Link to='/register' className='text-black text-decoration-none'>Register Now</Link>
  <Link to='/forget-pass' className='text-success text-decoration-none'>Forget Password</Link>

</div>
<button type="submit" className="btn btn-success  w-100 m-auto ">
  Submit
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
