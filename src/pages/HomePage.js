import { useEffect, useState } from "react";
import { getAllImagesInFolder, getImageFromStorage } from "../lib/api";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [landingImageURL, setLandingImageURL] = useState("");
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
  return (
    <Container fluid className="m-0 p-0 vh-100">
      <Carousel className="h-100 w-100">
        <Carousel.Item>
          <img
            // className="d-block w-100"
            className={`${styles.landing} h-100 d-block w-100 min-vh-100`}
            src={caruselImages[0]}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            // className="d-block w-100"
            className={`${styles.landing} h-100 d-block w-100 min-vh-100`}
            src={caruselImages[1]}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            //className=" "
            className={`${styles.landing} h-100 d-block w-100 min-vh-100`}
            src={caruselImages[2]}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <Image src={landingImageURL} fluid className={`${styles.landing} h-100`} /> */}
    </Container>
  );
};

export default HomePage;
