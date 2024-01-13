import React, { useEffect, useState } from "react";
import "../MovieCard/MovieCard.scss";
import Card from "react-bootstrap/Card";
import { baseImg } from "../../Utilities/AxiosConfig";
import DefaultMvCard from "../../Assets/DefaultMvImage.jpg";
import "react-circular-progressbar/dist/styles.css";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";
import { NavLink } from "react-router-dom";
import Fav from "../../Assets/socialIcon/heart.svg";
import AddedFav from "../../Assets/socialIcon/heartRed.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import {
  getAddFavData,
  getRemoveFavData,
} from "../../apiReducers/AddFavReducer";
import moment from "moment";

const MovieCard = (props) => {
  const { mvId, mvTitle, posterPath, releaseDate, rating, mvl, outer } = props;

  
  const getLocalUserId = localStorage.getItem("UserId");
  const getUserId = JSON.parse(getLocalUserId);

  const [isfav, setIsfav] = useState();
  const [dt, setdt] = useState();
  const [addFavData, setaddFavData] = useState([]);

  // const { addFavData } = useSelector((state) => state.favDetail);

  const dispatch = useDispatch();


  useEffect(() => {
    const getLocalFavData = localStorage.getItem("favMvData");
    const getFavData = JSON.parse(getLocalFavData);

    if(getFavData===null){
      localStorage.setItem("favMvData", JSON.stringify(addFavData));
    }
    else{
      setaddFavData(getFavData);
    }

  }, [])

  useEffect(() => {
    if (releaseDate !== "") {
      setdt(releaseDate);
    } else {
      setdt("2000-01-5");
    }
  }, [releaseDate]);

  let perRating = rating === 0 ? 20 : rating * 10;

  // setfavUser(isUse);
  const onClickAddToFav = () => {
    const getLocalFavData = localStorage.getItem("favMvData");
    const getFavData = JSON.parse(getLocalFavData);

    let isUse = getFavData.findIndex(function (ele) {
      return ele.userId === Number(getUserId);
    });

    if (isUse === -1) {
      const favObj = {
        userId: getUserId,
        favMvId: [],
      };
      const objTemp = { ...favObj };
      objTemp.favMvId.push(mvId);

      const temp = [...getFavData];

      temp.push(objTemp);
      localStorage.setItem("favMvData", JSON.stringify(temp));
      setaddFavData(temp);
    } else {
      const temping = [...getFavData];
      const tempMvData = [...temping[isUse].favMvId];

      const isFavMvId = tempMvData.findIndex(function (ele) {
        return ele === Number(mvId);
      });
      console.log("tempFavMvId", tempMvData);
      console.log("isFavMvId", isFavMvId);

      if (isFavMvId === -1) {
        const temp = [...getFavData];
        temp[isUse].favMvId.push(mvId);
        localStorage.setItem("favMvData", JSON.stringify(temp));
        setaddFavData(temp);
      } else {
        const temp = [...getFavData];
        temp[isUse].favMvId.splice(isFavMvId, 1);
        localStorage.setItem("favMvData", JSON.stringify(temp));
        setaddFavData(temp);
      }
    }
  };
  useEffect(() => {
    const temp = addFavData ? [...addFavData] : [];

    const inxUserFav = temp.findIndex(function (ele) {
      return ele.userId === getUserId;
    });

    let isFav = temp[inxUserFav]?.favMvId?.some(function (ele) {
      return ele === mvId;
    });
    setIsfav(isFav);
  }, [addFavData]);

  return (
    <div className="main-movie-card ">
      <Card className="border-0 bg-transparent">
        <NavLink
          to={
            outer === "outer" && mvl === 2
              ? "/outerMvDetail/" + mvId
              : outer === "outer" && mvl === 3
              ? "/outerMvDetail/" + mvId
              : "/mvDetailPage/" + mvId
            // outer === "outer" && mvl === 2
            //   ? "/outerMvDetail/" + mvId
            //   : outer === "outer" && mvl === 3
            //   ? "/outerMvDetail/" + mvId
            //   : mvl === 9
            //   ? "/searchDetail/" + mvId
            //   : mvl === 1
            //   ? "/nowPlayingDetail/" + mvId
            //   : mvl === 2
            //   ? "/popularDetail/" + mvId
            //   : mvl === 3
            //   ? "/topRatedDetail/" + mvId
            //   : ""
          }
        >
          <Card.Img
            variant="top"
            src={posterPath === null ? DefaultMvCard : baseImg + posterPath}
            className="mv-img"
          />
        </NavLink>

        <div
          className="roundProgress"
          style={{ width: 44, height: 44, color: "white" }}
        >
          <CircularProgressBar value={perRating} />
          {/* <CircularProgressbar value={perRating} text={`${perRating}%`}/> */}
        </div>

        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={
            isfav ? (
              <Tooltip id={`tooltip-`}>Remove to Favourite</Tooltip>
            ) : (
              <Tooltip id={`tooltip-`}>Add to Favourite</Tooltip>
            )
          }
        >
          <button
            className="addToFav d-flex align-items-center justify-content-center"
            onClick={onClickAddToFav}
          >
            <img src={isfav ? AddedFav : Fav} alt="" />
          </button>
        </OverlayTrigger>

        <Card.Body className="card-min-height ">
          <NavLink
            to={
              outer === "outer" && mvl === 2
                ? "/outerMvDetail/" + mvId
                : outer === "outer" && mvl === 3
                ? "/outerMvDetail/" + mvId
                : "/mvDetailPage/" + mvId
              // mvl === 1
              //   ? "/nowPlayingDetail/" + mvId
              //   : mvl === 2
              //   ? "/popularDetail/" + mvId
              //   : mvl === 3
              //   ? "/topRatedDetail/" + mvId
              //   : ""
            }
            className="my-a"
          >
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={<Tooltip id={`tooltip-`}>{mvTitle}</Tooltip>}
            >
              <Card.Title className=" fs-4 mv-title mt-3">
                {mvTitle?.length >= 15
                  ? mvTitle?.slice(0, 13) + "..."
                  : mvTitle}
              </Card.Title>
            </OverlayTrigger>
          </NavLink>

          <Card.Text className="text-secondary my-fs ">
            {/* {`${date} ${month}, ${year}`} */}
            {moment(dt).format("MMMM d,YYYY")}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;
