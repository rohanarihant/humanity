import React, {useState } from "react";
// react component for creating beautiful carousel
import Carousel from 'react-bootstrap/Carousel'

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} interval={1000} pause={"hover"| false} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src="static/slides/slide_1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src="static/slides/slide_2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src="static/slides/slide_3.jpg"
            alt="Third slide"
          />
        </Carousel.Item> */}
      </Carousel>
    );
  }
  
export default ControlledCarousel;