import React from 'react'
import '../TopRatingMvDetail/TopRatingMvDetail.scss'
import { useParams } from "react-router-dom";
import MvDetailPage from '../MvDetailPage/MvDetailPage';

const TopRatingMvDetail = () => {

    let { id } = useParams();

    return (
        <div className='mainTopRatedMvDetail'>
            <MvDetailPage  id={id}/>
        </div>
    )
}

export default TopRatingMvDetail
