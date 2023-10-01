import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateuserbyid } from '../../Redux/UserSlice';
import '../../styles/User.scss'

// Define the initial state for user data
const initialState = { userName: '', email:'',mobileNo:'',altMobileNo:'',age:''}

const EditUser = () => {
  const dispatch=useDispatch()
  const location = useLocation()
  const id=localStorage.getItem('id')
  const [dat] = useState(location.state)
  console.log(dat)

  // Define states using the useState hook
  const [user, setUser] = useState(dat)

  const navigate = useNavigate()
  // Function to update user details in state
  const changeHandler = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  // Function to clear all fields
  const clearHandler = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setUser(initialState)
    }
  }

  // Function to handle form submission and update user data
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateuserbyid(user))
      .then((res)=>{
        if (res.payload.message==='user updated successfully') {
            toast.success(res.payload.message)
            navigate('/users')
          }else{
            toast.error(res.payload.message)
          }
      })
    } catch (error) {
      console.log(error);
      toast.error(error.response.status === (503 || 500) ? 'Server is busy. Please try after sometime!' : error.response.data)
    }
  }

  // Function to toggle password visibility
  const showPassword = (inputId) => {
    const input = document.getElementById(inputId)
    const eye = document.getElementById('eye-symbol')
    // alert(input)
    if (input.type === 'password') {
      input.type = 'text'
      eye.classList.remove('bi-eye-fill')
      eye.classList.add('bi-eye-slash-fill')
    }
    else {
      input.type = 'password'
      eye.classList.remove('bi-eye-slash-fill')
      eye.classList.add('bi-eye-fill')
    }
  }

  return (
    <div className='users-container'>
    <div className="container" >
        <div className='buttons'>
        <button style={{ width: 'Auto' }} className='userbtn me-0' onClick={() => navigate('/users')}>All Users</button>
        </div>
        <div className="row d-flex justify-content-center">
        <div className="col-md-12">
            <div className="card my-3" >
            <div className="card-header  d-flex justify-content-between align-items-center">
                <h2 className='user-main-heading'>Update User </h2>
            </div>
            <p className='text-center'>User ID: {id}</p>
            <div className="card-body mx-md-5 pt-0">
                <form className='user_form' onSubmit={submitHandler} >
                    <div className="col-12 mt-3">
                        <div className="form-group">
                          <label htmlFor="userName">User Name <span className='required'>*</span></label>
                          <input type="text" name="userName" id="userName" value={user.userName} onChange={changeHandler} className='form-control' pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" required />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="email">Email <span className='required'>*</span></label>
                          <input type="email" name="email" id="email" value={user.email} onChange={changeHandler} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
                        </div>
                        {/* <div className="form-group mt-3">
                          <label htmlFor="password">Password <span className='required'>*</span></label>
                          <input type="password" name="password" id="password" value={user.password} onChange={changeHandler} className='form-control' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and one lowercase and at least 8 or more characters" required />
                          <span type='button' onClick={() => showPassword('password')}><i id='eye-symbol' className="bi bi-eye-fill"></i></span>
                        </div> */}
                    </div>
                    <div className="col-12">
                        <div className="form-group mt-md-3" >
                          <label htmlFor="mobileNo">Mobile Number <span className='required'>*</span></label>
                          <input type="text" name="mobileNo" id="mobileNo" value={user.mobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' required />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="altMobileNo">Alt Mobile Number</label>
                          <input type="text" name="altMobileNo" id="altMobileNo" value={user.altMobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="age">Age</label>
                          <input type="text" name="age" id="age" value={user.age} onChange={changeHandler} className='form-control' title='Please enter valid age' />
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                    <div className="d-flex justify-content-center">
                        <button type="submit" className='userbtn'>Update</button>
                        <button className='userbtn' onClick={clearHandler}>Clear</button>
                    </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div >
    </div>
  )
}

export default EditUser