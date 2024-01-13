import React,{ useEffect,useState }  from 'react'
import '../PopularMv/PopularMv.scss'
import { useSelector, useDispatch } from "react-redux"
import MvPage from '../MvPage/MvPage'
import { apikey } from "../../Utilities/AxiosConfig.js";
import instance from "../../Utilities/AxiosConfig.js";
import { getPopularData } from '../../apiReducers/PopularReducer';

const PopularMv = () => {

    const { popularData } = useSelector((state) => state.popular);
    const { storeSearchData } =  useSelector((state)=> state.searching);

    const dispatch = useDispatch();

    const [sendData, setsendData] = useState(popularData);


    useEffect(() => {
        instance
          .get(`/movie/popular?api_key=${apikey}`)
          .then((response) => {
            dispatch(getPopularData(response?.data?.results));
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
          setsendData(popularData);
        } 
        
      }, [storeSearchData,popularData])

    return (
        <div>
            <MvPage mvHead='Movies' mvData={sendData} mvl={2}/>            
        </div>
    )
}

export default PopularMv
