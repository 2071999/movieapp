import React,{useEffect} from "react";
import "../OuterMvDetail/OuterMvDetail.scss";
import testBack from "../../Assets/testBack.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CircularProgressBar from "../../Components/CircularProgressBar/CircularProgressBar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import list from "../../Assets/socialIcon/list.svg";
import heart from "../../Assets/socialIcon/heart.svg";
import bookmark from "../../Assets/socialIcon/bookmark.svg";
import star from "../../Assets/socialIcon/star.svg";
import play from "../../Assets/socialIcon/play.svg";
import back from "../../Assets/socialIcon/back.svg";
import sideImg from "../../Assets/textSideImg.jpg";
import { NavLink, useParams } from "react-router-dom";
import instance from "../../Utilities/AxiosConfig.js";
import { apikey } from "../../Utilities/AxiosConfig.js";
import { useSelector, useDispatch } from "react-redux"
import { getMvDetailData } from '../../apiReducers/MvDetailsReducer';
import {baseImg} from '../../Utilities/AxiosConfig';


const OuterMvDetail = () => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const { mvDetailData } = useSelector((state) => state.mvDetail);


  useEffect(() => {
    instance
      .get(`/movie/${id}?api_key=${apikey}`)
      .then((response) => {
        dispatch(getMvDetailData(response?.data));
      })
      .catch((error) => {
        console.log("Error", error.response);
      });
  },[]);

  let dtn = mvDetailData.length !==0 ? mvDetailData.release_date?.split('-') : ''
  var months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
    
      let mnth = dtn[1];
      
      let month = months[mnth-1];
      let year = dtn[0];
      let date = dtn[2];
    
    let perRating = mvDetailData.length !==0 ? mvDetailData.vote_average*10 : 50;

  return (
    <div
      className="mainMvDetail"
      style={{ backgroundImage: `url(${baseImg+mvDetailData?.backdrop_path})` }}
    >
      <div className="ab"></div>
      <Container fluid className="py-3 re">
        <Row className="WCUpper-Part">
          <Col xs={5} className="over-Content  px-md-5 px-4">
            <NavLink
              to="/"
              className="logoImg fs-2 text-red fw-bolder my-outer-a"
            >
              AlmaBetter
            </NavLink>
          </Col>
          <Col xs={7} className="">
            <div className="signIn-btn  px-md-3  d-flex justify-content-end">
              <div className="px-md-4">
                <NavLink
                  to="/registration"
                  className="btn btn-danger my-bg-red px-md-4 mt-md-2 me-4"
                >
                  Sign Up
                </NavLink>

                <NavLink
                  to="/login"
                  className="btn btn-danger my-bg-red px-md-4 mt-md-2"
                >
                  Sign In
                </NavLink>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="pt-5">
          <Col md={4} lg={3} className="ps-lg-4">
            <div className="sideImg ps-lg-3 d-flex justify-content-center">
              <img
                src={baseImg+mvDetailData?.poster_path}
                alt=""
                className="my-side-img w-100"
                height="400px"
              />
            </div>
          </Col>
          <Col md={8} lg={9} className="text-white py-4">
            <div className="detial-des-container">
              <div className="head text-white fs-3 fw-bolder">{mvDetailData?.title}</div>
              <div className="release-date-des text-white fw-lighter my-fs-6 d-md-flex">
                <div className="date">{date} {month} {year} (US)</div>
                <span className="text-secondary px-1 d-none d-md-block">
                  {" "}
                  &bull;{" "}
                </span>
                <div className="mv-type-detail">
                  {" "}
                  Action, Adventure, Romance
                </div>
                <span className="text-secondary px-1  d-none d-md-block">
                  {" "}
                  &bull;{" "}
                </span>
                <div className="duration">2h 28m</div>
              </div>
            </div>

            <div className="pro-save-etc py-4 d-md-flex align-items-center">
              <div className="detail-progressBar-box d-flex align-items-center pb-4 pb-md-0">
                <div
                  className="detail-probar "
                  style={{ width: 44, height: 44, color: "white" }}
                >
                  <CircularProgressBar value={perRating} />
                </div>
                <div className="detail-probar-lable px-3 lh-sm ">
                  User <br />
                  Score
                </div>
              </div>

              <div className="detail-save d-flex">
                {/* <div className="playlist px-md-3 pe-3">
                  <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={<Tooltip id={`tooltip-`}>Add to list</Tooltip>}
                  >
                    <Button variant="secondary" className="rounded-circle">
                      <img src={list} alt="" height="14px" width="14px" />
                    </Button>
                  </OverlayTrigger>
                </div> */}
                <div className="playlist  px-3">
                  {/* <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-`}>Mark as favourite</Tooltip>
                    }
                  >
                    <Button variant="secondary" className="rounded-circle">
                      <img src={heart} alt="" height="14px" width="14px" />
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
              </div>
              <div className="trailerBox pt-3 pt-md-0">
                <Button variant="transparent" className="d-flex my-trailer-btn">
                  <div className="playIcon pe-2">
                    <img src={play} alt="" height="20px" width="20px" />
                  </div>
                  {/* <div className="trailer-lable text-white">Play Trailer</div> */}
                </Button>
              </div>
            </div>
            <div className="overview-main pe-md-5">
              <div className="overview-lable fs-4">Overview</div>
              <div className="overview-des fw-light pe-5">
                {mvDetailData?.overview}
              </div>
            </div>
            <div className="goBackBox py-4">
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OuterMvDetail;
