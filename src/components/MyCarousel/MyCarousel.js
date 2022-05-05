import { useEffect, useState } from "react";
import { getAllImagesInFolder } from "../../lib/api";
import Carousel from "react-bootstrap/Carousel";
import "./MyCarousel.css";

const MyCarousel = () => {
  const [caruselImages, setCaruselImages] = useState([]);

  useEffect(() => {
    getAllImagesInFolder("images").then((res) => {
      res.forEach((img) => {
        setCaruselImages((prev) => {
          return [...prev, img];
        });
      });
    });
  }, []);

  let carouselContent = caruselImages.map((img) => {
    return (
      <Carousel.Item interval={99999999999} key={img}>
        <div className="image-container-flex">
          <img className="d-block" src={img} alt="First slide" />
          <div className="image-description">
            <h1>Name of Item</h1>
            <p>short description</p>
          </div>
        </div>
      </Carousel.Item>
    );
  });

  return <Carousel>{carouselContent}</Carousel>;
};

export default MyCarousel;
