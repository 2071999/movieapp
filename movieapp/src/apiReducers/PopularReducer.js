import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    popularData: [],
}

export const popularSlice = createSlice({
    name:'popular',
    initialState,
    reducers:{
        getPopularData:(state,action)=>{
            state.popularData=action?.payload;
            // console.log('popular data redux', state.popularData);
        }
    }
})

export const { getPopularData } = popularSlice.actions
export default popularSlice.reducer