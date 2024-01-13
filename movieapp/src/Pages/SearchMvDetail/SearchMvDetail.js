import React from 'react'
import '../SearchMvDetail/SearchMvDetail'
import { useParams } from "react-router-dom";
import MvDetailPage from '../MvDetailPage/MvDetailPage';

const SearchMvDetail = () => {

  let { id } = useParams();


    return (
        <div className='mainSearchDetail'>
            <MvDetailPage id={id}/>
        </div>
    )
}

export default SearchMvDetail
