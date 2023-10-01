import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserSlice'

const store=configureStore({
    reducer:{
        users:UserReducer
    }
})
export default store