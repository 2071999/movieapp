import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addFavData: [],
}

export const addFavSlice = createSlice({
    name:'favDetail',
    initialState,
    reducers:{
        getAddFavData:(state,action)=>{
            const temp = [...state.addFavData];
            temp.push(action?.payload);
            state.addFavData=temp;
            // localStorage.setItem("favMvData", JSON.stringify(state.addFavData));

            // console.log('Favourite Detail Data redux', state.addFavData);
        },
        getRemoveFavData:(state,action)=>{
            const temp = [...state.addFavData];
            temp.splice(action?.payload, 1);
            state.addFavData=temp;
        }
    }
})
export const { getAddFavData,getRemoveFavData } = addFavSlice.actions
export default addFavSlice.reducer