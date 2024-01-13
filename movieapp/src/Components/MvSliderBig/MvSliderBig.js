import React from "react";
import Slider from "react-slick";
import '../MvSliderBig/MvSliderBig.scss';
import {baseImg} from '../../Utilities/AxiosConfig';

const MvSliderBig = (props) => {
  const { movieType } = props;

  const settings = {
    centerMode: true,
    centerPadding: "320px",
    slidesToShow: 1,
    focusOnSelect: true,
    arrows: false,
    dots: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {movieType?.map((item) => (
          <div key={Math.random()}>
            <h3>
              <div className='mvSliderBig' style={{'backgroundImage':`url(${baseImg+item.backdrop_path})`}}>
                  
              </div>
                  {/* <img src={baseImg+item.backdrop_path} alt="" height='400' width='650'  style={{'cursor':'pointer'}}/> */}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MvSliderBig;
