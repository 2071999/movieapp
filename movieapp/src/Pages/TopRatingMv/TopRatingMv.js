import React,{ useEffect,useState } from 'react'
import '../TopRatingMv/TopRatingMv.scss'
import { useSelector, useDispatch } from "react-redux"
import MvPage from '../MvPage/MvPage'
import { apikey } from "../../Utilities/AxiosConfig.js";
import instance from "../../Utilities/AxiosConfig.js";
import { getTopRatedData } from '../../apiReducers/TopRatedReducer'

const TopRatingMv = () => {

    const { topRatedData } = useSelector((state) => state.topRated);
    const { storeSearchData } =  useSelector((state)=> state.searching);

    const dispatch = useDispatch();

    const [sendData, setsendData] = useState(topRatedData);

    useEffect(() => {
        instance
          .get(`/movie/top_rated?api_key=${apikey}`)
          .then((response) => {
            dispatch(getTopRatedData(response?.data?.results));
          })
          .catch((error) => {
            console.log("Error", error.response);
          });
      }, []);

      useEffect(() => {
        if(storeSearchData.length !== 0){
          setsendData(storeSearchData);
        }
        else{
          setsendData(topRatedData);
        } 
        
      }, [storeSearchData,topRatedData])

    return (
        <div>
            <MvPage mvHead='TV Series' mvData={sendData} mvl={3}/>
        </div>
    )
}

export default TopRatingMv
