import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nowPlayingData: [],
}

export const nowPlayingSlice = createSlice({
    name:'nowPlaying',
    initialState,
    reducers:{
        getNowPlayingData:(state,action)=>{
            state.nowPlayingData=action?.payload;
            // console.log('Now Playing data redux', state.nowPlayingData);
        }
    }
})

export const { getNowPlayingData } = nowPlayingSlice.actions
export default nowPlayingSlice.reducer