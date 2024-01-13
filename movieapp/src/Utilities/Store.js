import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../Pages/Registration/ReducerRegistration';
import logginReducer from '../Pages/Login/ReducerLogin';
import popularReducer from '../apiReducers/PopularReducer';
import topRatedReducer from '../apiReducers/TopRatedReducer';
import nowPlayingReducer from '../apiReducers/NowPlayingReducer';
import searchingReducer from '../apiReducers/SearchReducer';
import mvDetailReducer from '../apiReducers/MvDetailsReducer';
import addFavReducer from '../apiReducers/AddFavReducer';
import sortingReducer from '../apiReducers/SortReducer';

export default configureStore({
    reducer:{
        register:registerReducer,
        login:logginReducer,
        popular:popularReducer,
        topRated:topRatedReducer,
        nowPlaying:nowPlayingReducer,
        searching:searchingReducer,
        mvDetail:mvDetailReducer,
        favDetail:addFavReducer,
        sorting:sortingReducer,
    }
})