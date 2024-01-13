import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mvDetailData: [],
}

export const mvDetailSlice = createSlice({
    name:'mvDetail',
    initialState,
    reducers:{
        getMvDetailData:(state,action)=>{
            state.mvDetailData=action?.payload;
            // console.log('Movie Detail Data redux', state.mvDetailData);
        }
    }
})
export const { getMvDetailData } = mvDetailSlice.actions
export default mvDetailSlice.reducer