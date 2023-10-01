import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const registerUser=createAsyncThunk('registerUser',async(user)=>{
    const response=await fetch('http://localhost:3001/api/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
    })
    try{
         const result=response.json()
         return result
    }catch(error){
        return response.json(error)
    }
})

export const loginUser=createAsyncThunk('loginUser',async(details)=>{
    const response=await fetch('http://localhost:3001/api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(details),
    })
    try{
        const result=response.json()
        console.log(result)
         return result
    }catch(error){
        return response.json(error)
    }
})

export const getAllUsers=createAsyncThunk('allUsers',async()=>{
    const response=await fetch('http://localhost:3001/api/getallusers',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type':'application/json'
        }
    })
    try{
        return response.json()
    }catch(err){
        return response.json(err)
    }
})

export const updateuserbyid=createAsyncThunk('updateuserbyid',async(user)=>{
    console.log(user)
    const response=await fetch(`http://localhost:3001/api/updateuserbyid/${localStorage.getItem('id')}`,{
        method:'PUT',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
    })
    try{
        return response.json()
    }catch(err){
        return response.json(err)
    }
})

export const deleteUserbyid=createAsyncThunk('deleteuserbyid',async(id)=>{
    console.log(id)
    const response=await fetch(`http://localhost:3001/api/deleteuserbyid/${id}`,{
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type':'application/json'
        }
    })
    try{
        return response.json()
    }catch(err){
        return response.json(err)
    }
})
const userSlice=createSlice({
    name:"users",
    initialState:{
        message:'',
        users:[],
        status:'',
        user:'',
        accessToken:'',
        loading:false,
        error:''
    },
    reducers:{

    },
    extraReducers:{
        [registerUser.pending]:(state,action)=>{
            state.loading=true
        },
        [registerUser.fulfilled]:(state,action)=>{
            const {message}=action.payload
            state.loading=false
            state.message=message
            state.error=null
        },
        [registerUser.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload.message
        },
        [loginUser.pending]:(state,action)=>{
            state.loading=true
        },
        [loginUser.fulfilled]:(state,action)=>{
            const {accessToken,message}=action.payload
            state.loading=false
            state.accessToken=accessToken
            state.message=message
            state.error=null
        },
        [loginUser.rejected]:(state,action)=>{
            state.loading=true
            state.error=action.payload.message
        },
        [getAllUsers.pending]:(state,action)=>{
            state.loading=true
        },
        [getAllUsers.fulfilled]:(state,action)=>{
            state.loading=false
            state.user=action.payload.users
            state.error=null
        },
        [getAllUsers.rejected]:(state,action)=>{
            state.loading=true
            state.error=action.payload.message
        },
        [updateuserbyid.pending]:(state,action)=>{
            state.loading=true
        },
        [updateuserbyid.fulfilled]:(state,action)=>{
            state.loading=false
            state.message=action.payload.message
            state.error=null
        },
        [updateuserbyid.rejected]:(state,action)=>{
            state.loading=true
            state.error=true
        },
        [deleteUserbyid.pending]:(state,action)=>{
            state.loading=true
        },
        [deleteUserbyid.fulfilled]:(state,action)=>{
            state.loading=false
            state.message=action.payload.message
            state.error=null
        },
        [deleteUserbyid.rejected]:(state,action)=>{
            state.loading=true
            state.error=action.payload.message
        }
    }
})

export default userSlice.reducer