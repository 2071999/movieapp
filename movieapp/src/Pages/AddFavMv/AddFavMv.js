import React,{useEffect} from 'react';
import '../AddFavMv/AddFavMv.scss';
import MvPage from '../MvPage/MvPage';
import { useSelector, useDispatch } from "react-redux";
import instance from "../../Utilities/AxiosConfig.js";
import { apikey } from "../../Utilities/AxiosConfig.js";
import { getMvDetailData } from "../../apiReducers/MvDetailsReducer";

const AddFavMv = () => {

    // const dispatch = useDispatch();
    const { addFavData } = useSelector((state) => state.favDetail);
    // const { mvDetailData } = useSelector((state) => state.mvDetail);

    // console.log('Add Fav Page Id', addFavData);

    return (
        <div className='mainAddFav'>
            <MvPage mvHead='Favourite Movie'  mvl={8}/>
        </div>
    )
}

export default AddFavMv
