import React from 'react'
import '../PopularMvDetail/PopularMvDetail.scss'
import { useParams } from "react-router-dom";
import MvDetailPage from '../MvDetailPage/MvDetailPage';

const PopularMvDetail = () => {

    let { id } = useParams();

    return (
        <div>
            <MvDetailPage id={id}/>
        </div>
    )
}

export default PopularMvDetail
