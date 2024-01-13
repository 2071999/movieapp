import React,{useEffect} from 'react'
import MvPage from '../MvPage/MvPage'
import '../SearchMv/SearchMv.scss'
import { useSelector, useDispatch } from "react-redux"
import { apikey } from "../../Utilities/AxiosConfig.js";
import instance from "../../Utilities/AxiosConfig.js";
import { getStoreSearchingData } from '../../apiReducers/SearchReducer';

const SearchMv = () => {

    const { searchData,storeSearchData } = useSelector((state) => state.searching);
    const dispatch = useDispatch();

    useEffect(() => {
        instance
          .get(`search/movie?api_key=${apikey}&query=${searchData}`)
          .then((response) => {
            dispatch(getStoreSearchingData(response?.data?.results));
          })
          .catch((error) => {
            console.log("Error", error.response);
          });
      }, []);

    // console.log('search Page', searchData);
      // console.log('Search Page', storeSearchData);
    return (
        <div className='main-search'>
            <MvPage mvHead='' mvData={storeSearchData} mvl={9}/>
        </div>
    )
}

export default SearchMv
