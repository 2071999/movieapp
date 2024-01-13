import React,{ useEffect,useState } from 'react'
import '../NowPlayingMv/NowPlayingMv.js'
import { useSelector, useDispatch } from "react-redux"
import MvPage from '../MvPage/MvPage'
import { apikey } from "../../Utilities/AxiosConfig.js";
import instance from "../../Utilities/AxiosConfig.js";
import { getNowPlayingData } from '../../apiReducers/NowPlayingReducer';


const NowPlayingMv = () => {

    const { nowPlayingData } = useSelector((state) => state.nowPlaying);
    const { storeSearchData } =  useSelector((state)=> state.searching);

    const dispatch = useDispatch();

    const [sendData, setsendData] = useState(nowPlayingData);

    useEffect(() => {
      instance
        .get(`/movie/now_playing?api_key=${apikey}`)
        .then((response) => {
          dispatch(getNowPlayingData(response?.data?.results));
        })
        .catch((error) => {
          console.log("Error", error.response);
        });
    }, [])

    useEffect(() => {
      if(storeSearchData.length !== 0){
        setsendData(storeSearchData);
      }
      else{
        setsendData(nowPlayingData);
      }
      }, [storeSearchData,nowPlayingData]);

    return (
        <div>
            <MvPage mvHead='Movies' mvData={sendData} mvl={1}/>
        </div>
    )
}

export default NowPlayingMv
