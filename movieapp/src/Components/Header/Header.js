import React, { useState, useEffect } from "react";
import "./Header.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchingData } from "../../apiReducers/SearchReducer";
import search from "../../Assets/socialIcon/search.svg";
import { apikey } from "../../Utilities/AxiosConfig.js";
import instance from "../../Utilities/AxiosConfig.js";
import { getStoreSearchingData } from "../../apiReducers/SearchReducer";
import { getSortData } from '../../apiReducers/SortReducer'

const Header = () => {
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.searching);
  const { sortData } = useSelector((state) => state.sorting);

  const [searchInput, setsearchInput] = useState("");


  const onChangeSearch = (e) => {
    setsearchInput(e.target.value);
  };

  function sortByKey(array, key) {
    array = array?.slice().sort((a, b) => b[key] - a[key])
    dispatch(getStoreSearchingData(array));
  }

  function sortByNew(array, key){
    array = array?.slice().sort((a,b)=> new Date(b[key]) - new Date(a[key]) )
    dispatch(getStoreSearchingData(array));
    // setpropData(array);
  }

  function sortByOld(array, key){
    array = array?.slice().sort((a,b)=> new Date(a[key]) - new Date(b[key]) )
    dispatch(getStoreSearchingData(array));
    // setpropData(array);
  }

  useEffect(() => {
    if (searchData.length >= 2) {
      instance
        .get(`search/movie?api_key=${apikey}&query=${searchData}`)
        .then((response) => {

          if(sortData==='rating'){
            sortByKey(response?.data?.results,'vote_average')
          }
          else if(sortData==='new'){
            sortByNew(response?.data?.results,'release_date')
          }
          else if(sortData==='old'){
            sortByOld(response?.data?.results,'release_date')
          }
          else if(sortData==='none'){
            dispatch(getStoreSearchingData(response?.data?.results));
          }
          else{
            dispatch(getStoreSearchingData(response?.data?.results));
          }

        })
        .catch((error) => {
          console.log("Error", error.response);
        });
    } else {
      dispatch(getStoreSearchingData([]));
    }
  }, [searchData]);

  useEffect(() => {

    if(searchInput===''){
      dispatch(getSortData('none'));
    }

    dispatch(getSearchingData(searchInput));
    // console.log(searchInput);
  }, [searchInput]);

  return (
    <div className="mainHeader ">
      <Navbar bg="transparent" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <div className="fs-2 text-red fw-bolder d-lg-none">AlmaBetter</div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" className="" />

          <Navbar.Collapse id="navbarScroll ">
            <Container fluid>
              <Row>
                <Col lg={2}>
                  <NavLink to="/" className="navBrand">
                    <div className="fs-2 text-red fw-bolder d-none d-lg-block">
                      AlmaBetter
                    </div>
                  </NavLink>
                </Col>

                <Col lg={8}>
                  <Nav
                    className=" my-lg-0 d-flex justify-content-lg-center flex-column flex-lg-row"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <NavLink
                      to="/"
                      className={` px-2 py-2 my-custom-aa `}
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "red" : "",
                        };
                      }}
                  
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/nowPlaying"
                      className=" px-2 py-2 my-custom-aa"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "red" : "",
                        };
                      }}
                    >
                      Movies
                    </NavLink>

                    <NavLink
                      to="/topRated"
                      className=" px-2 py-2 my-custom-aa"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "red" : "",
                        };
                      }}
                    >
                      TV Series
                    </NavLink>

                
                  </Nav>
                </Col>

                <Col lg={2}>
                  <div className="search" autoComplete="off">
                    <input
                      type="checkbox"
                      id="toggleSearch"
                      className="search__toggle"
                      hidden
                    />
                    <div className="search__field mt-2">
                      <label htmlFor="toggleSearch" className="search__label">
                        <span className="search__close"></span>
                      </label>
                      <input
                        type="text"
                        className="search__input"
                        placeholder="Search"
                        name="search1"
                        autoComplete="off"
                        onChange={onChangeSearch}
                      />
                      <label htmlFor="toggleSearch" className="search__label">
                        <div className="search__button">
                          <img src={search} alt="" height="18px" />
                          {/* <div className="search__icon search__button--toggle"></div> */}
                        </div>
                        {/* <NavLink to='/home/search'> */}
                        <button className="search__button search__button--submit my-tra-btn">
                          {/* <img src={search} alt="" height="18px" /> */}
                        </button>
                        {/* </NavLink> */}
                      </label>
                    </div>
                  </div>

                 
                </Col>
              </Row>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
