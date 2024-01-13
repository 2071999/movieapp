import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    topRatedData: [],
}

export const topRatedSlice = createSlice({
    name:'topRated',
    initialState,
    reducers:{
        getTopRatedData:(state,action)=>{
            state.topRatedData=action?.payload;
            // console.log('Top Rated data redux', state.topRatedData);
        }
    }
})

export const { getTopRatedData } = topRatedSlice.actions
export default topRatedSlice.reducer