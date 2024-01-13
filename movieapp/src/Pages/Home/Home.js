import React, { useEffect, useState } from "react";
import "../Home/Home.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MvSlider from "../../Components/MvSlider/MvSlider";

import { useDispatch, useSelector } from "react-redux";
import CarouselData from "../../Components/CarouselData/CarouselData";
import instance from "../../Utilities/AxiosConfig.js";
import { apikey } from "../../Utilities/AxiosConfig.js";
import { getPopularData } from "../../apiReducers/PopularReducer";
import { getTopRatedData } from "../../apiReducers/TopRatedReducer";
import { getNowPlayingData } from "../../apiReducers/NowPlayingReducer";
import MovieCard from "../../Components/MovieCard/MovieCard";
import MvPageBg from "../../Assets/moviePageBg.jpg";
import Button from "react-bootstrap/Button";
import { getMoreSearchData } from '../../apiReducers/SearchReducer';

const Home = () => {
  const { popularData } = useSelector((state) => state.popular);
  const { topRatedData } = useSelector((state) => state.topRated);
  const { nowPlayingData } = useSelector((state) => state.nowPlaying);
  const { storeSearchData } = useSelector((state) => state.searching);
  const { searchData } = useSelector((state) => state.searching);

  const dispatch = useDispatch();

  const [moreData, setmoreData] = useState([]);
  const [serachData, setserachData] = useState([]);
  const [page, setpage] = useState(2);
    const [searchMovieName, setsearchMovieName] = useState('');

    useEffect(() => {
        setsearchMovieName(searchData);
    }, [searchData])

  useEffect(() => {
    setserachData(storeSearchData);
  }, [storeSearchData]);

//   console.log('Search move nAME',searchMovieName)

  useEffect(() => {
      

    dispatch(getMoreSearchData(moreData));


   

  }, [moreData])



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


  const onClickLoadMore = () => {

    if(searchData!==''){
        setpage(page+1);
        instance
          .get(`search/movie?api_key=${apikey}&query=${searchData}&page=${page}`)
          .then((response) => {
            setmoreData(response?.data?.results);
          })
          .catch((error) => {
            console.log("Error", error.response);
          });
    }
  };

  return (
    <>
      {searchData.length <=2 ? (
        <div className="mainHome my-bg-blue">
          {/* <Container
            fluid
            className="homeHeadUpper d-flex align-items-center justify-content-center py-5 "
            style={{ backgroundImage: `url(${homeHeadBg})` }}
          >
            {/* <div className="py-4">
              <Row className="my-1">
                <Col xs={12}>
                  <div className="text-white text-center my-letter-space">
                    A Movie By Mathey Bonnati
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <div className="text-white my-big-font text-center">
                    ACROSS THE UNIVERSE
                  </div>
                </Col>
              </Row>
              <Row className="my-1">
                <Col xs={12}>
                  <div className="text-white text-center my-letter-space">
                    Story Inspire By The Lives Of Two Artists
                  </div>
                </Col>
              </Row>
              <Row className="py-4">
                <Col md={{ span: 2, offset: 3 }}>
                  <div className="head-sm-img-1 d-flex justify-content-center py-3">
                    <img src={homeHeadBgSm2} alt="" />
                  </div>
                </Col>
                <Col md={{ span: 2 }}>
                  <div className="head-sm-img-1 d-flex justify-content-center py-3">
                    <img src={homeHeadBgSm1} alt="" />
                  </div>
                </Col>
                <Col md={{ span: 2 }}>
                  <div className="head-sm-img-1  d-flex justify-content-center py-3">
                    <img src={homeHeadBgSm3} alt="" />
                  </div>
                </Col>
              </Row>
            </div> */}
          {/* </Container> */} */}
          <Container fluid>
            <div className="nowPlaying pt-3">
              <Row>
                <MvSlider
                  slideHead="Movies"
                  movieType={nowPlayingData}
                  mvl={1}
                />
              </Row>
            </div>
            <div className="nowPlaying pt-3">
              <Row>
                <MvSlider
                  slideHead="TV Series"
                  movieType={popularData}
                  mvl={2}
                />
              </Row>
            </div>
            
          </Container>
        
        </div>
      ) : (
        <div className="mainHome my-bg-blue">
          <Container
            fluid
            className="homeHeadUpper-search   py-5 "
            style={{ backgroundImage: `url(${MvPageBg})` }}
          >
            <Row className="pt-5 px">
              {serachData.map((item) => (
                <Col xs={3} key={Math.random()} className="px-5">
                  <MovieCard
                    mvId={item.id}
                    mvTitle={item.title}
                    posterPath={item.poster_path}
                    releaseDate={item.release_date}
                    rating={item.vote_average}
                    mvl={1}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <div className="loadMore">
                <div className="loadMoreBtn d-flex justify-content-center">
             
                </div>
              </div>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Home;
