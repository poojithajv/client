import React, { useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import toast from 'react-hot-toast';
import { useNavigate, } from 'react-router-dom';
import { loginUser } from '../Redux/UserSlice';
import '../styles/Login.scss'

// Define initial state for the user object
const initialState = {
	email: '',
	password: ''
}

const Login = () => {
	const dispatch=useDispatch()
	// Initialize state variables using the useState hook
	const [user, setUser] = useState(initialState)
	const navigate = useNavigate()

	// Function to handle input changes and update the user state
	const changeHandler = (e) => {
		e.preventDefault()
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}
	// Function to show/hide the password input
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


	// Function to handle form submission and call login API
	const submitHandler = async (e) => {
		try {
			e.preventDefault()
			dispatch(loginUser(user))
			.then((res)=>{
			  console.log(res.payload.message)
			  if (res.payload.message==='Logged in successfully'){
				navigate('/users')
				localStorage.setItem('accessToken',res.payload.accessToken)
				toast.success(res.payload.message)
				// Reset the user state to the initial state
				setUser(initialState)
			  }else{
				toast.error(res.payload.message)
			  }
			})
		  } catch (error) {
			console.log(error.message);
			toast.error(error.response.status === (503 || 500) ? 'Server is busy. Please try after sometime!' : error.response.data)
		  }
	}
	return (
		<div className='login-container'>
			<div className='container'>
				<div className="row d-flex justify-content-center">
					<div className="col-md-6 col-12 ">
						<div className="card my-3">
							<div className="card-header">
								<h2 className='user-main-heading'>Login</h2>
							</div>
							<div className="card-body">
								<form onSubmit={submitHandler} className='user_form'>
									<div className="form-group mt-3">
										<label htmlFor="email">Email <span className='required'>*</span></label>
										<input type="email" name="email" id="email" value={user.email} onChange={changeHandler} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
									</div>
									<div className="form-group mt-3">
										<label htmlFor="password">Password <span className='required'>*</span></label>
										<input type="password" name="password" id="password" value={user.password} onChange={changeHandler} className='form-control' required />
										<span type='button' onClick={() => showPassword('password')}><i id='eye-symbol' className="bi bi-eye-fill"></i></span>
									</div>
									<div className="col-12 text-center">
										<div className="d-flex justify-content-center">
											<button type="submit" className='userbtn' value={'Submit'} >Submit</button>
										</div>
									</div>
                                    <div className="col-12 mt-3 text-center">
										<div className="d-flex justify-content-between">
                                            <h3>Don't have an account? </h3>
											<button type="button" className='userbtn' onClick={()=>navigate('/register')} >Register</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Login