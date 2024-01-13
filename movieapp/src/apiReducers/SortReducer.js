import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sortData : 'none',
}

export const sortSlice = createSlice({
    name:'sorting',
    initialState,
    reducers:{
        getSortData:(state,action)=>{
            state.sortData=action?.payload;
            // console.log('sort data redux', state.sortData);
        }
    }
})

export const { getSortData } = sortSlice.actions
export default sortSlice.reducer