import React from 'react'

import { useForm } from 'react-hook-form'
import { FaUserPlus } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Adduser() {

  let [error,setError]=useState("")

  const navigate=useNavigate();

  let {register,handleSubmit,formState:{errors}}=useForm()

  let formSubmit=(userObj)=>
  {
   // console.log(userObj);
    axios.post("http://localhost:4000/users",userObj)
   .then(response=>
    {
      //console.log("response is",response)
      if(response.status===201)
        {
          navigate("/users")
        }
    }
  )
   .catch(err=>
    {
      //client side error-response property error response (4xx,5xx)-url error
      if(err.response)
        {
          setError(err.message)
        }
        //client never received response-network error only everything else is correct
        else if(err.request){
          setError(err.message)
        }
        else
        {
          setError(err.message)
        }
    }
  )

  }
  return (
    <div className="AddnewUser">
            <p className="display-5 mt-3 text-center">Add New User</p>
            {
              error.length!==0 && <p className='text-center text-danger display-2'>*{error }</p>
            }
    <div className='row'>
      <div className="col-11 col-sm-8 col-md-6 mx-auto">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className='mt-3'>
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" className='form-control' {...register("name",{required:true})} />
          {errors.name?.type==="required" && 
            <p className='text-danger fw-bold'>*Name is required</p>
          }

          </div>

          <div className='mt-3'>
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" id="email" className='form-control' {...register("email",{required:true})} />
          {errors.email?.type==="required" && 
            <p className='text-danger fw-bold'>*Email is required</p>
          }

          </div>

          <div className='mt-3'>
          <label htmlFor="dob" className="form-label">DOB</label>
          <input type="date" id="dob" className='form-control' {...register("dob",{required:true})} />
          {errors.dob?.type==="required" && 
            <p className='text-danger fw-bold'>*DateOfBirth is required</p>
          }

          </div>

          <div className='mt-3 '>
          <label htmlFor="userimg" className="form-label">UserImage</label>
          <input type="text" id='userimg' className='form-control' {...register("userimg",{required:true})} />
          {errors.userimg?.type==="required" && 
            <p className='text-danger fw-bold'>*Image is required</p>
          }

          </div>

         <div > <button  type="submit" className='btn btn-success mt-3 text-black  float-right'>Create New User
         <span><FaUserPlus /></span>
         </button></div>
       
      </form>
      </div>
    </div>
    </div>
  )
}

export default Adduser