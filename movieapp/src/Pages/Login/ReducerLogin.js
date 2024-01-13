import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggin: false
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        setIsLoggin:(state,action)=>{
            state.isLoggin=action.payload;
            // console.log('isLoggin redux', state.isLoggin)
        }
    }
})

export const { setIsLoggin } = loginSlice.actions
export default loginSlice.reducer

