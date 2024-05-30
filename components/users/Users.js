import React from 'react'
import './Users.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


function Users() {

  let [error,setError]=useState("");

  let [users,setUsers]=useState([]);

  //edit user state-the info tht shoeuld appear on modal when edit is clicked

  let [editUserstate,setEditUserState]=useState({})
 // let [deleteUserState,setDeleteUserState]=useState=({})

  const navigate=useNavigate();

  const getuserdata=()=>
    {
      axios.get("http://localhost:4000/users")
      .then((response)=>
        {
          //console.log(response)
            if(response.status===200)
              {
                setUsers(response.data);
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
        })
    }

  let {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm()

  //modal state
  let[show,setshow]=useState(false)//false because initially it should not appear
  const openModal=()=>setshow(true)
  const closeModal=()=>setshow(false)

  const editUser=(userObj)=>
    {
      openModal()

      setEditUserState(userObj)

      setValue("name",userObj.name)
      setValue("email",userObj.email)
      setValue("dob",userObj.dob)
      setValue("userimg",userObj.userimg)
    }

   

  const saveChanges=()=>
    {
      closeModal();

      let modifiedUser=getValues();

      modifiedUser.id=editUserstate.id;

      axios.put(`http://localhost:4000/users/${modifiedUser.id}`, modifiedUser)
      .then(response=>
        {
          if(response.status===200)
          { //modified users data
              getuserdata()
          }
        }
      )
    }

    const deleteUser = async (userId) => {
      try {
        const response = await axios.delete(`http://localhost:4000/users/${userId}`);
        if (response.status === 200) {
          console.log('User deleted successfully');
          const filteredUsers = users.filter((user) => user.id !== userId); // Filter deleted user
          setUsers(filteredUsers); // Update state with filtered users
        } else {
          setError('Error deleting user');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Network error or server error'); // Handle generic errors
      }
    };

    
  

  useEffect(()=>{
    getuserdata()
  },[])

  return (

    <div className='container'>
    
      <button className="btn btn-danger  mt-3 mybutton" onClick={()=>navigate("/")} >+</button>
     

    <div className="text-center" >
         {
              error.length!==0 && <p className='text-center text-danger display-2'>*{error }</p>
        }
       <div className="container2  mb-5"> 
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 ">
          {
            users.map(userObj=>
              
                <div className="col mx-auto text-center mt-5" key={userObj.id}>
                  <div className="card ">
                   <img src={userObj.userimg} alt="user image" 
                    className='mx-auto p-3 profile'/> 
                    <div className="card-body">
                      <p className="display-5 name">{userObj.name}</p>
                      <p className="lead fs-4">{userObj.email}</p>
                      <p className="lead">DOB : {userObj.dob}</p>

                      <button className=" btn btn-warning float-start" onClick={()=>editUser(userObj)}>Edit</button>
                      <button className="btn btn-danger float-end" onClick={()=>deleteUser(userObj.id)} >Delete</button>
                    </div>
                  </div>
                </div>
              
            )
          }
        </div>
        </div>

            <Modal show={show} onHide={closeModal} backdrop="static" centered className="mymodal">
              <Modal.Header closeButton>Edit Profile</Modal.Header>
              <Modal.Body>

              <form onSubmit={handleSubmit(saveChanges)}>
        <div >
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" className='form-control' {...register("name",{required:true})} />
          

          </div>

          <div className='mt-3'>
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" id="email" className='form-control' {...register("email",{required:true})} />
          
          </div>

          <div className='mt-3'>
          <label htmlFor="dob" className="form-label">DOB</label>
          <input type="date" id="dob" className='form-control' {...register("dob",{required:true})} />
          

          </div>

          <div className='mt-3'>
          <label htmlFor="userimg" className="form-label">UserImage</label>
          <input type="text" id='userimg' className='form-control' {...register("userimg",{required:true})} disabled/>
          

          </div>

        {/* <div > <button  type="submit" className='btn btn-success mt-3 text-black  float-right'>Create New User
         <span><FaUserPlus /></span>
        </button></div> */}
       
      </form>

              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-info "onClick={saveChanges}>Save Changes</button>
              </Modal.Footer>
            </Modal>

    </div>

    </div>
  )
}

export default Users