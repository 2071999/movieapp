import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    registerData: [],
}

export const registerSlice = createSlice({
    name:'register',
    initialState,
    reducers:{
        addRegisterData: (state, action) => {
           
            state.registerData = action.payload;
            // console.log('Registration Redux' , state.registerData);
        }
    }
})

export const { addRegisterData } = registerSlice.actions
export default registerSlice.reducer