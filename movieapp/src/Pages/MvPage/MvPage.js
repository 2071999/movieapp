import React,{ useState,useEffect } from "react";
import "../MvPage/MvPage.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import mvPage from "../../Assets/moviePageBg.jpg";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../Components/MovieCard/MovieCard";
import NoSearchFound from "../../Components/NoSearchFound/NoSearchFound";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import SideAccordion from "../../Components/SideAccordion/SideAccordion";
import SearchMvDetail from "../SearchMvDetail/SearchMvDetail";
import Button from 'react-bootstrap/Button'
import { apikey } from "../../Utilities/AxiosConfig.js";
import instance from "../../Utilities/AxiosConfig.js";
import { getSortData } from '../../apiReducers/SortReducer'

const MvPage = (props) => {
  const { mvHead, mvData, mvl } = props;

  const [moreData, setmoreData] = useState([]);
  const [propData, setpropData] = useState([]);
  const [page, setpage] = useState(2);

  const dispatch = useDispatch();

  const { searchData } = useSelector((state) => state.searching);
  const { sortData } = useSelector((state) => state.sorting);

  function sortByKey(array, key) {
    array = array?.slice().sort((a, b) => b[key] - a[key])
    setpropData(array);
  }
  function sortByNew(array, key){
    array = array?.slice().sort((a,b)=> new Date(b[key]) - new Date(a[key]) )
    setpropData(array);
  }
  function sortByOld(array, key){
    array = array?.slice().sort((a,b)=> new Date(a[key]) - new Date(b[key]) )
    setpropData(array);
  }

  useEffect(() => {
    dispatch(getSortData('none'));
  }, [])

  useEffect(() => {

    console.log('Propdata:',propData);
    // if(propData.length !== 0){
      if(sortData==='rating'){
        let temp = [...propData]
        sortByKey(temp,'vote_average');
      }
      else if(sortData==='new'){
        let temp = [...propData]
        sortByNew(temp,'release_date')
      }
      else if(sortData==='old'){
        let temp = [...propData]
        sortByOld(temp,'release_date')
      }
      else if(sortData==='none'){
        setpropData(mvData);
      }
      else{
        setpropData(mvData);
      }
    // }

  }, [sortData])
  
  // const dispatch = useDispatch();
  
  useEffect(() => {
    setpropData(mvData);
  }, [mvData])
  
  useEffect(() => {

    const temp = [...propData];
    const tempArr=temp.concat(moreData);

    if(tempArr.length !== 0){
      if(sortData==='rating'){
        sortByKey(tempArr,'vote_average');
      }
      else if(sortData==='new'){
        sortByNew(tempArr,'release_date')
      }
      else if(sortData==='old'){
        sortByOld(tempArr,'release_date')
      }
      else if(sortData==='none'){
        setpropData(tempArr);
      }
      else{
        setpropData(tempArr);
      }
    }


    
  }, [moreData])

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
    else{
      if(mvl===1){
        setpage(page+1);
        instance
          .get(`/movie/now_playing?api_key=${apikey}&page=${page}`)
          .then((response) => {
            setmoreData(response?.data?.results);
          })
          .catch((error) => {
            console.log("Error", error.response);
          });
      }
      else if(mvl===2){
        setpage(page+1);
        instance
          .get(`/movie/popular?api_key=${apikey}&page=${page}`)
          .then((response) => {
            setmoreData(response?.data?.results);
  
          })
          .catch((error) => {
            console.log("Error", error.response);
          });
      }
      else if(mvl===3){
        setpage(page+1);
        instance
          .get(`/movie/top_rated?api_key=${apikey}&page=${page}`)
          .then((response) => {
            setmoreData(response?.data?.results);
          })
          .catch((error) => {
            console.log("Error", error.response);
          });
      }
      else{
      }
    }

    

  }

  return (
    <div
      className="mainMvPage py-5"
      style={{ backgroundImage: `url(${mvPage})` }}
    >
      <Container fluid className="pt-5 text-white">
        <Row>
          <Col className="ps-4">
            <div className="movie-head fs-4 fw-bold ps-3">{mvHead}</div>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="ps-lg-4">
            <SideAccordion/>
          </Col>

          

          <Col md={9}>
            <div className="card-container-mv pt-2">
              <Row>
                {propData
                  ?.filter((val) => {
                    if (searchData === "") {
                      return val;
                    } else if (
                      val.title.toLowerCase().includes(searchData.toLowerCase())
                    ) {
                      return val;
                    } else {
                      return ""
                    }
                  })
                  .map((item) => (
                    <Col xs={6} md={4} lg={3} key={Math.random()}>
                      <MovieCard
                        mvId={item.id}
                        mvTitle={item.title}
                        posterPath={item.poster_path}
                        releaseDate={item.release_date}
                        rating={item.vote_average}
                        mvl={mvl}
                      />
                    </Col>
                  ))}
              </Row>
            </div>
            <div className="loadMore">
              <div className="loadMoreBtn d-flex justify-content-center">
                <Button variant="info" className='rounded-pill px-5 my-load-more'  onClick={onClickLoadMore} >Load More</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MvPage;
