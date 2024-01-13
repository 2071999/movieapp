import React from "react";
import '../NowPlayingMvDetail/NowPlayingMvDetail.scss';
import MvDetailPage from "../MvDetailPage/MvDetailPage";
import { useParams } from "react-router-dom";

const NowPlayingMvDetail = () => {
  
  let { id } = useParams();

  return (
    <div className="mainNowPlayingMvDetail">
      <MvDetailPage  id={id}/>
    </div>
  );
};

export default NowPlayingMvDetail;
