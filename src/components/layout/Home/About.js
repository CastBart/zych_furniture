import { useEffect } from "react";
import { getImageFromStorage } from "../../../lib/api";
import useHttp from "../../../hooks/use-http";
import { Spinner } from "react-bootstrap";
import "./About.css";

const About = () => {
  const {
    sendRequest: getImageIdea,
    statusIdea,
    data: imageUrlIdea,
    errorIdea,
  } = useHttp(getImageFromStorage, true);
  const {
    sendRequest: getImageMeasuring,
    statusMeasuring,
    data: imageUrlMeasuring,
    errorMeasuring,
  } = useHttp(getImageFromStorage, true);

  useEffect(() => {
    getImageIdea("about/idea.png");
    getImageMeasuring("about/measuring tape.png");
  }, [getImageIdea, getImageMeasuring]);

  //start of idea content
  let ideaContent = (
    <div>
      <h2>How we do it</h2>
      <p>
        The process is quite simple on your side. What we need you to do is most
        like already done. It's the <strong>idea</strong> we need from you. Just
        put that idea on paper, draw it out as best as you can. We will then
        come to your house discuss the details with you. Details such as
        position in the garden, size, wood type, colour and we will also take
        all the needed measurments. When thats done, we make everything at in
        the workshop and when its done, we bring all the materials to you and
        put everything together.
      </p>
      <div className="image-container-flex">
        <img src={imageUrlIdea} />
      </div>
    </div>
  );
  if (statusIdea === "pending") {
    ideaContent = (
      <div className="centered">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (errorIdea) {
    ideaContent = <p>{errorIdea}</p>;
  }
  //end of idea content

  //start of measuring content
  let measuringContent = (
    <div>
      <h2>What we do</h2>
      <p>
        We are <strong>ZychFurniture</strong> and we are here to make your dream
        garden funrniture. All the furniture we make is hand crafted made from
        any type of wood you desire. Furniture we make are single or double
        swings to enjoy the weather while your sipping on your favourite
        beverage and pergolas to shield you from next heavy rain. The design is
        based on your idea and vision. We simply make your idea come to reality.
      </p>
      <div className="image-container-flex">
        <img src={imageUrlMeasuring} />
      </div>
    </div>
  );

  if (statusMeasuring === "pending") {
    measuringContent = (
      <div className="centered">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if(errorMeasuring){
    measuringContent = <p>{errorMeasuring}</p>
  }
  //end of measuring content

  return (
    <section id="about" className="fullscreen-container d-flex about-color justify-content-center">
      <div className="row container-md">
        <h1>About us</h1>
        <div className="col-md">
          <div className="container-md">{measuringContent}</div>
        </div>
        <div className="col-md">
          <div className="container-md">{ideaContent}</div>
        </div>
      </div>
    </section>
  );
};
export default About;
