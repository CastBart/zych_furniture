import { useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { getImageFromStorage } from "../../../lib/api";
import "./About.css";

const About = () => {
  const {
    sendRequest: getImage,
    status,
    data: imageUrl,
    error,
  } = useHttp(getImageFromStorage, true);

  useEffect(() => {
    getImage("about/about-bg.jpg");
  }, [getImage]);

  return (
    <section id="about" className="fullscreen-container">
      <div className="image-container-flex about-color">
        <img src={imageUrl} />
        <div className="about-description">
          <p>
            Random text to fill up the area and test how it behaves on multiple
            screen sizes
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;
