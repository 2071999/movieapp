import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchData: '',
    storeSearchData: [],
    isSearchData : false,
}

export const searchingSlice = createSlice({
    name:'searching',
    initialState,
    reducers:{
        getSearchingData:(state,action)=>{
            state.searchData=action?.payload;
            // console.log('Searching Result', state.searchData);
        },
        getStoreSearchingData:(state,action)=>{
            state.storeSearchData=action?.payload;
            // console.log('Searching Data Form search redux',state.storeSearchData);
        },
        getIsSearchData:(state,action)=>{
            state.isSearchData=action?.payload;
            // console.log('isSearch redux', state.isSearchData);
        },
        getMoreSearchData:(state,action)=>{
            const temp = [...state.storeSearchData];
            const tempArr = temp.concat(action?.payload);
            state.storeSearchData = tempArr;
            // console.log('Added More data from Redux:',state.storeSearchData);
        },
    }
})
export const { getSearchingData, getStoreSearchingData, getIsSearchData, getMoreSearchData } = searchingSlice.actions
export default searchingSlice.reducer
