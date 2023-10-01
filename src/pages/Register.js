import React, { useState} from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss'
import {useDispatch} from 'react-redux'
import { registerUser } from '../Redux/UserSlice';

// Define initial state values for user and salesperson
const initialUser = {
  userName: '', email: '', password: '', mobileNo: '', altMobileNo: '',age:''
}


const Register = () => {
  const dispatch=useDispatch()
  const [user, setUser] = useState(initialUser)

  const navigate = useNavigate()

  // Function to update user details in state
  const changeHandler = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }



  // Function to submit user registration
  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      dispatch(registerUser(user))
      .then((res)=>{
        console.log(res.payload)
        if (res.payload.message==='User Created Successfully'){
          toast.success(res.payload.message)
          navigate('/')
        }else{
          toast.error(res.payload.message)
        }
      })
    } catch (error) {
      console.log(error.message);
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
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 ">
              <div className="card my-3">
                <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h2 className='user-main-heading'>Create User</h2>
                </div>
                <div className="card-body mx-md-5 pt-0">
                  <form className='user_form' onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <label htmlFor="userName">User Name <span className='required'>*</span></label>
                          <input type="text" name="userName" id="userName" value={user.userName} onChange={changeHandler} className='form-control' pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" required />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="email">Email <span className='required'>*</span></label>
                          <input type="email" name="email" id="email" value={user.email} onChange={changeHandler} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="password">Password <span className='required'>*</span></label>
                          <input type="password" name="password" id="password" value={user.password} onChange={changeHandler} className='form-control' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and one lowercase and at least 8 or more characters" required />
                          <span type='button' onClick={() => showPassword('password')}><i id='eye-symbol' className="bi bi-eye-fill"></i></span>
                        </div>
                      </div>
                      <div className="col-md-6">
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
                      <div className="col-12 mt-2">
                        <div className="d-flex justify-content-center">
                          <button type="submit" className='userbtn'>Submit</button>
                        </div>
                      </div>
                      <div className="col-12 mt-3 text-center">
                        <div className="d-flex justify-content-around">
                            <h3>Already have an account? </h3>
                            <button type="button" className='userbtn' onClick={()=>navigate('/')} >Login</button>
                        </div>
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

export default Register