import React, { useEffect } from "react";
import "../WCBoard/WCBoard.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BackPoster from "../../Assets/BgWC.jpg";
// import logo from '../../Assets/logo.png';
// import Button from 'react-bootstrap/Button'
// import Row1Img from "../../Assets/row-1.jpg";
// import greyBack from "../../Assets/greyBack.jpg";
import Row4Img from "../../Assets/row-4.png";
// import Footer from "../../Components/Footer/Footer";
import { NavLink } from "react-router-dom";
import MvSlider from "../../Components/MvSlider/MvSlider";
import instance from "../../Utilities/AxiosConfig.js";
import { apikey } from "../../Utilities/AxiosConfig.js";
import WCVedio from "../../Assets/WCVedio.m4v";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getPopularData } from '../../apiReducers/PopularReducer';
import { getTopRatedData } from '../../apiReducers/TopRatedReducer';
import { getNowPlayingData } from '../../apiReducers/NowPlayingReducer';

const WCBoard = () => {
  // const { isLoggin } = useSelector((state) => state.login);
  const isLog = localStorage.getItem('isLoggin');
  const isLoggin = JSON.parse(isLog);

  const { popularData } = useSelector((state) => state.popular);
  const { topRatedData } = useSelector((state) => state.topRated);


  const dispatch = useDispatch();

  useEffect(() => {
    instance
      .get(`/movie/popular?api_key=${apikey}`)
      .then((response) => { 
        dispatch(getPopularData(response?.data?.results));
      })
      .catch((error) => {
        console.log("Error", error.response);
      });

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
    instance
      .get(`/movie/now_playing?api_key=${apikey}`)
      .then((response) => {
        dispatch(getNowPlayingData(response?.data?.results));
      })
      .catch((error) => {
        console.log("Error", error.response);
      });
  }, []);

  
  return (
    <>
      {isLoggin ? (
        <Navigate to={"/"} />
      ) : (
        <div>
          <Container
            fluid
            className="upper-container"
            // style={{
            //   backgroundImage: `url(${BackPoster})`,
            //   minHeight: "120vh",
            // }}
          >
            <Row className="WCUpper-Part">
              <Col xs={5} className="over-Content py-3 px-md-5 px-4">
                <div className="logoImg fs-2 text-red fw-bolder">AlmaBetter</div>
              </Col>
              <Col xs={7} className="">
                <div className="signIn-btn py-3 px-md-5  d-flex justify-content-end">
                  <div>
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

            {/* <Row className="WCUpper-Part">
              <Col md={{ offset: 3, span: 6 }}>
                <div className="py-5"></div>
                <div className="main-head-wcboard  text-white">
                  <div className="hedline fs-1 fw-bolder text-center lh-sm pt-3">
                    Unlimited TV shows, movies and more.
                  </div>
                  <div className="head-des  text-center py-3 wc-word-set">
                    Watch anywhere. Cancel anytime.
                  </div>
                  <div className="head-des-sm text-center wc-word-set">
                    Ready to watch? Enter your email to create or restart your
                    membership.
                  </div>
                  <div className="signUp-btn d-flex justify-content-center pt-3">
                    
                  </div>
                </div>

                <div className="py-5"></div>
              </Col>
            </Row> */}
          </Container>
          <Container fluid>
            <Row className="pb-3 pt-3 my-bg-blue ">
              <MvSlider slideHead="Movies" movieType={popularData} outer='outer' mvl={2}/>
            </Row>
            <Row className="pb-3 pt-3 my-bg-blue ">
              <MvSlider slideHead="TV Series" movieType={topRatedData} outer='outer' mvl={3}/>
            </Row>
          </Container>
          <Container
            fluid
            className="img-poster-card my-bg-light-blue"
            
          >
            <Row className="py-5 px-5 wc-upper-row ">
              {/* <Col
                md={{ offset: 1, span: 5 }}
                className="d-flex  align-items-center px-4"
              >
                <div className="wc-row-1 ">
                  <div className="wc-row-1-hed fs-1 fw-bolder lh-sm text-blue">
                    Enjoy on your TV.
                  </div>
                  <div className="wc-row-1-des fs-5 py-3 lh-sm fw-lighter">
                    Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                    Blue players and more.
                  </div>
                </div>
              </Col> */}
              <Col md={5} className="px-4 d-flex align-items-center">
                
                {/* <div className='embed-responsive-item'> 
                  <video className='w-100  '  autoPlay muted loop>
                    <source src={WCVedio} type="video/mp4" />
                  </video>
                </div> */}
                
                {/* <div className="wc-row-img">
                                  <img src={Row1Img} alt="" className='w-100'/>
                              </div> */}
              </Col>
            </Row>
            <Row className="py-1 px-5   wc-upper-row">
              {/* <Col md={{ offset: 1, span: 5 }} className="px-4">
                <div className="wc-row-img">
                  <img src={Row4Img} alt="" className="w-100" />
                </div>
              </Col> */}
              {/* <Col md={5} className="d-flex  align-items-center px-4">
                <div className="wc-row-1 ">
                  <div className="wc-row-1-hed fs-1 fw-bolder lh-sm text-blue">
                    Create profiles for children.
                  </div>
                  <div className="wc-row-1-des fs-5 py-3 lh-sm fw-lighter">
                    Send children on adventures with their favourite characters
                    in a space made just for them—free with your membership.
                  </div>
                </div>
              </Col> */}
            </Row>
            
          </Container>
          {/* <Container fluid className="my-bg-blue text-white ">
            <Footer />
          </Container> */}
        </div>
      )}
    </>
  );
};

export default WCBoard;
