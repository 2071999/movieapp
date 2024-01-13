import React, { useEffect, useState } from "react";
import "../MvDetailPage/MvDetailPage.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CircularProgressBar from "../../Components/CircularProgressBar/CircularProgressBar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import list from "../../Assets/socialIcon/list.svg";
import heart from "../../Assets/socialIcon/heart.svg";
import AddedFav from "../../Assets/socialIcon/heartRed.svg";
import bookmark from "../../Assets/socialIcon/bookmark.svg";
import star from "../../Assets/socialIcon/star.svg";
import play from "../../Assets/socialIcon/play.svg";
import { baseImg } from "../../Utilities/AxiosConfig";
import instance from "../../Utilities/AxiosConfig.js";
import { apikey } from "../../Utilities/AxiosConfig.js";
import { useSelector, useDispatch } from "react-redux";
import { getMvDetailData } from "../../apiReducers/MvDetailsReducer";
import DefaultImg from "../../Assets/DefaultMvImage.jpg";
import DefaultBackDrop from "../../Assets/DefaultBackdrop.jpg";
import moment from "moment";
import {
  getAddFavData,
  getRemoveFavData,
} from "../../apiReducers/AddFavReducer";
import { useParams } from "react-router-dom";

const MvDetailPage = (props) => {
  // const { id } = props;
  let { id } = useParams();

  const getLocalFavData = localStorage.getItem("favMvData");
  const getFavData = JSON.parse(getLocalFavData);

  const getLocalUserId = localStorage.getItem('UserId')
  const getUserId = JSON.parse(getLocalUserId);

  const [addFavData, setaddFavData] = useState(getFavData);


  const [isfav, setIsfav] = useState();
  const [dt, setdt] = useState();

  
  const dispatch = useDispatch();
  const { mvDetailData } = useSelector((state) => state.mvDetail);
  // const { addFavData } = useSelector((state) => state.favDetail);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(mvDetailData)


  useEffect(() => {
    instance
      .get(`/movie/${id}?api_key=${apikey}`)
      .then((response) => {
        dispatch(getMvDetailData(response?.data));
      })
      .catch((error) => {
        console.log("Error", error.response);
      });
  }, []);


  useEffect(() => {
    if(mvDetailData?.release_date!=''){
      setdt(mvDetailData?.release_date);
    }
    else{
      setdt('2000-01-5');
    }
  }, [mvDetailData?.release_date])
  // const dt = mvDetailData?.release_date;

  let sideImg = mvDetailData.length !== 0 ? mvDetailData?.poster_path : null;

  let perRating =
    mvDetailData.length !== 0 ? mvDetailData.vote_average * 10 : 50;

  let x = mvDetailData.length !== 0 ? mvDetailData.runtime : 150;
  let h = x / 60;
  let hr = Math.floor(h);
  let minute = x % 60;

  let defOverView = `
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae labore eligendi beatae sed itaque libero, dolores sapiente consequuntur nihil temporibus cumque sunt asperiores, corporis laborum reiciendis explicabo? Perferendis, sed tempore.`;

  let defTagline = `Almabetter is recommended to see this movie`;

  let budget = mvDetailData.length !== 0 ? mvDetailData.budget : 1000000;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let lang = mvDetailData.length !== 0 ? mvDetailData.original_language : "en";

  function ogLang(x) {
    if (x === "en") {
      return "English";
    } else if (x === "ja") {
      return "Japanes";
    } else if (x === "hi") {
      return "Hindi";
    } else if (x === "gu") {
      return "Gujarati";
    } else {
      return "Spanise";
    }
  }

  let backDrop =
    mvDetailData?.backdrop_path === null
      ? DefaultBackDrop
      : baseImg + mvDetailData?.backdrop_path;




  const onClickAddToFav = () => {

    const getLocalFavData = localStorage.getItem("favMvData");
    const getFavData = JSON.parse(getLocalFavData); 

    let isUse = getFavData.findIndex(function(ele) {
      return ele.userId === Number(getUserId);
    });

    if(isUse === -1){
      const favObj = {
        userId: getUserId,
        favMvId: [],
      };
      const objTemp={...favObj};
      objTemp.favMvId.push(mvDetailData?.id)

      const temp = [...getFavData];

      temp.push(objTemp);
      localStorage.setItem("favMvData", JSON.stringify(temp));
      setaddFavData(temp);

    }
    else{

      const temping = [...getFavData];
      const tempMvData = [...temping[isUse].favMvId];

      const isFavMvId = tempMvData.findIndex(function(ele){
        return ele === Number(mvDetailData?.id);
      });
      console.log('tempFavMvId',tempMvData);
      console.log('isFavMvId',isFavMvId);

      if(isFavMvId === -1){
        const temp = [...getFavData];
        temp[isUse].favMvId.push(mvDetailData?.id)
        localStorage.setItem("favMvData", JSON.stringify(temp));
        setaddFavData(temp);

      }
      else{
        const temp = [...getFavData];
        temp[isUse].favMvId.splice(isFavMvId, 1);
        localStorage.setItem("favMvData", JSON.stringify(temp));
        setaddFavData(temp);

      }
    }

    // redux toolkit

    // let ind = addFavData.findIndex(function (item) {
    //   return item.favMvId === Number(id);
    // });

    // setIsfav(ind);

    // if (ind === -1) {
    //   const favObj = {
    //     userId: 11,
    //     favMvId: Number(id),
    //   };
    //   dispatch(getAddFavData(favObj));
    // } else {
    //   dispatch(getRemoveFavData(ind));
    // }
  };

  useEffect(() => {
    console.log('updated fav data', addFavData);
    const temp = addFavData ? [...addFavData] : [];
    console.log('updated fav temp', temp);

    const inxUserFav = temp.findIndex(function(ele){
      return ele.userId ===  getUserId;
    });
    
    let isFav = temp[inxUserFav]?.favMvId?.some(function(ele) {
      console.log('e',ele)
      return ele === mvDetailData?.id;
    });
    console.log('updated isfav',temp[inxUserFav]);
    setIsfav(isFav);
  }, [addFavData])

 
  // let isFav = addFavData.some(function (ele) {
  //   return ele.favMvId === Number(id);
  // });

  return (
    <div
      className="mainMvDetail"
      style={{
        backgroundImage: `url(${backDrop})`,
      }}
    >
      <div className="ab"></div>
      <Container fluid className="py-5 re">
        <Row className="pt-5">
          <Col md={4} lg={{ span: 4 }} className="ps-lg-4">
            <div className="sideImg  ps-lg-5 pe-lg-4 d-flex justify-content-center">
              <img
                src={sideImg !== null ? baseImg + sideImg : DefaultImg}
                alt=""
                className="my-side-img w-100"
                height="450px"
              />
            </div>
          </Col>
          <Col md={8} lg={{ span: 6 }} className="text-white py-4">
            <div className="detial-des-container">
              <div className="head text-white fs-3 fw-bolder">
                {mvDetailData?.title}
              </div>
              <div className="release-date-des text-white fw-lighter my-fs-6 d-md-flex">
                <div className="date">
                  {moment(dt).format("MMMM d,YYYY")}
                  {/* {date} {month} {year}  */}
                </div>
                <span className="text-secondary px-1 d-none d-md-block">
                  {" "}
                  &bull;{" "}
                </span>
                <div className="mv-type-detail">
                  {" "}
                  {mvDetailData?.length !== 0 ? (
                    <div className="d-flex">
                      {mvDetailData.genres.length !== 0 ? (
                        mvDetailData.genres.map((val, inx) => {
                          return (
                            <div className="px-1" key={inx}>
                              {" "}
                              {val?.name}
                            </div>
                          );
                        })
                      ) : (
                        <>
                          <div className="px-1">Entertainment</div>
                        </>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <span className="text-secondary px-1  d-none d-md-block">
                  {" "}
                  &bull;{" "}
                </span>
                <div className="duration">
                  {hr === 0 ? "1" : hr}Hr {minute === 0 ? "30" : minute}Min
                </div>
              </div>
            </div>

            <div className="pro-save-etc py-4 d-md-flex align-items-center">
              <div className="detail-progressBar-box d-flex align-items-center pb-4 pb-md-0 ">
                <div
                  className="detail-probar "
                  style={{ width: 48, height: 48, color: "white" }}
                >
                  <CircularProgressBar
                    value={perRating === 0 ? 50 : perRating}
                  />
                </div>
                <div className="detail-probar-lable px-3 lh-sm ">
                  User <br />
                  Score
                </div>
              </div>

              <div className="detail-save d-flex">
                <div className="playlist px-md-3 pe-3">
                  {/* <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={<Tooltip id={`tooltip-`}>Add to list</Tooltip>}
                  >
                    <Button variant="secondary" className="rounded-circle">
                      <img src={list} alt="" height="14px" width="14px" />
                    </Button>
                  </OverlayTrigger> */}
                </div>
                <div className="playlist  px-3">
                  {/* <OverlayTrigger
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
                    <Button
                      variant="secondary"
                      className={`rounded-circle my-heart-btn `}
                      onClick={onClickAddToFav}
                    
                    >
                      
                      <img src={isfav ? AddedFav : heart} alt="" height="14px" width="14px" />
                    </Button>
                  </OverlayTrigger> */}
                </div>
                <div className="playlist  px-3">
                  <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-`}>Add to watchlist</Tooltip>
                    }
                  >
                    <Button variant="secondary" className="rounded-circle">
                      <img src={bookmark} alt="" height="14px" width="14px" />
                    </Button>
                  </OverlayTrigger>
                </div>
                <div className="playlist  px-3">
                  {/* <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={<Tooltip id={`tooltip-`}>Rate it</Tooltip>}
                  >
                    <Button variant="secondary" className="rounded-circle">
                      <img src={star} alt="" height="14px" width="14px" />
                    </Button>
                  </OverlayTrigger> */}
                </div>
                {/* <div className="playlist  px-3">
                  <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={<Tooltip id={`tooltip-`}>Play Trailer</Tooltip>}
                  >
                    <Button variant="secondary" className="rounded-circle">
                      <img src={play} alt="" height="17px"  />
                    </Button>
                  </OverlayTrigger>
                </div> */}
              </div>
              <div className="trailerBox pt-3 pt-md-0">
                {/* <Button variant="transparent" className="d-flex my-trailer-btn">
                  <div className="playIcon pe-2">
                    <img src={play} alt="" height="20px" width="20px" />
                  </div>
                  <div className="trailer-lable text-white">Play Trailer</div>
                </Button> */}
              </div>
            </div>
            <div className="tagLine py-1 my-fw-lighter ">
              {mvDetailData?.tagline === ""
                ? defTagline
                : mvDetailData?.tagline}
            </div>
            <div className="overview-main pt-2">
              <div className="overview-lable fs-4">Overview</div>
              <div className="overview-des fw-light ">
                {mvDetailData?.overview === ""
                  ? defOverView
                  : mvDetailData?.overview}
              </div>
            </div>
            {/* <div className="more-Details py-4 d-flex justify-content-between">
              <div className="budget">
                <div className="budget-lable">Status</div>
                <div className="budget-lable fw-lighter my-fs-b">
                  {mvDetailData?.status === ""
                    ? "Released"
                    : mvDetailData?.status}
                </div>
              </div>
              <div className="budget">
                <div className="budget-lable">Budget</div>
                <div className="budget-lable fw-lighter my-fs-b">
                  ${" "}
                  {numberWithCommas(budget) === "0"
                    ? "10,000,000"
                    : numberWithCommas(budget)}
                </div>
              </div>
              <div className="budget">
                <div className="budget-lable">Original Lanugage</div>
                <div className="budget-lable fw-lighter my-fs-b">
                  {ogLang(lang)}{" "}
                </div>
              </div>
            </div> */}
            {/* <div className="goBackBox py-4">
              <Button
                variant="secondary"
                className="d-flex my-trailer-btn rounded-pill"
                onClick={() => window.history.back()}
              >
                <div className="playIcon pe-2">
                  <img src={back} alt="" height="20px" width="20px" />
                </div>
                <div className="trailer-lable text-white">Go Back</div>
              </Button>
            </div> */}
          </Col>
          {/* <Col lg={{span:2}}>sdf</Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default MvDetailPage;
