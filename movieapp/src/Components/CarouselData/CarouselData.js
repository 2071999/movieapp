import React, { useState } from "react";
import "../CarouselData/CarouselData.scss";
import Carousel from "react-bootstrap/Carousel";
import star from '../../Assets/star.svg';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CarouselData = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

 
};

export default CarouselData;
