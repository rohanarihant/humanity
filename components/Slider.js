import React, {useState } from "react";
// react component for creating beautiful carousel
import Carousel from 'react-bootstrap/Carousel'

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const imagesList = ['slide_1.png','slide_2.jpg','slide_3.jpg','slide_5.jpg',]
    return (
      <Carousel activeIndex={index} interval={1000} pause={"hover"|false} onSelect={handleSelect}>
        {imagesList.map(img => (<Carousel.Item>
          <img
            className="d-block w-100"
            src={`static/slides/${img}`}
            alt="First slide"
            style={{height: 200}}
          />
        </Carousel.Item>))}
      </Carousel>
    );
  }
  
export default ControlledCarousel;