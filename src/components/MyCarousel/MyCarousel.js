import { useEffect } from "react";
import { getLandingImagesInfo } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import "./MyCarousel.css";

const MyCarousel = () => {

  const {
    sendRequest: getLandingData,
    status,
    data: landingData,
    error,
  } = useHttp(getLandingImagesInfo, true);

  useEffect(() => {
    getLandingData();
  }, [getLandingData]);


  if (status === "pending") {
    return (
      <div className="fullscreen-container">
        <div className="centered">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const carouselContent = landingData.map((img) => {
    return (
      <Carousel.Item interval={9999999999} key={img.id}>
        <div className="image-container-flex">
          <img className="d-block" src={img.src} alt="First slide" />
          <div className="image-description">
            <h1>{img.id}</h1>
            <p>{img.description}</p>
          </div>
        </div>
      </Carousel.Item>
    );
  });

  return <Carousel>{carouselContent}</Carousel>;
};

export default MyCarousel;
