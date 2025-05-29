import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../assets/styles/carrousel.css"; // Ensure you have this CSS file for custom styles

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1440 }, items: 3 },
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const ProyectosCarousel = ({ images }) => {
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      showDots={true}
      slidesToSlide={1}
      draggable={true}
      swipeable={true}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
    >
      {images.map((imgSrc, index) => (

        <div key={index} className="carousel-item-wrapper px-1">
          <a href="">
            <img
              key={index}
              src={imgSrc}
              alt={`Proyecto ${index + 1}`}
              style={{ width: "100%", height: "40em" }}
            />
          </a>
        </div>
      ))}
    </Carousel>
  );
};

export default ProyectosCarousel;
