import React from 'react'
import './MvSlider.scss';
import Slider from "react-slick";
import MovieCard from '../MovieCard/MovieCard';


const PopularMvSlide = (props) => {

    const {slideHead, movieType, mvl, outer} = props;

    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 8000,
        autoplaySpeed: 1000,
        cssEase: "linear",
        arrows: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };


    
    return (
        <div>
            <div className="head text-white fs-2 ms-md-4 pb-4">
                {slideHead}
            </div>
            <Slider {...settings}>

                {
                    movieType?.map((item)=>(
                        <div className='px-4' key={Math.random()}>
                            <MovieCard mvTitle={item.title} posterPath={item.poster_path} releaseDate={item.release_date} rating={item.vote_average} mvl={mvl} mvId={item.id} outer={outer}/>
                        </div>
                    ))
                }
            
            
            </Slider>
      </div>
    )
}

export default PopularMvSlide
