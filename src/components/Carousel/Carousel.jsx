import React from "react";
import Flickity from "react-flickity-component";
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';

import "../Carousel/Carousel.css";
import styles from "./Slider.module.scss";

function Carousel() {
  const flickityOptions = {
    initialIndex: 0,
    draggable: true,
    accessibility: true,
    wrapAround: true,
    freeScroll: false,
    contain: true,
    friction: 0.5,
    autoPlay: 5000,
    pauseAutoPlayOnHover: false,
    imagesLoaded: true, 
    pageDots: true,
    prevNextButtons: false,
    fade: true,
  };

  const images = [img1, img2, img3]

  return (
    <Flickity options={flickityOptions} className={styles.slider}>
      {images?.map((item, index) => (
          <img key={index} src={item} alt="rty" />
      ))}
    </Flickity>
  );
}
export default Carousel;
