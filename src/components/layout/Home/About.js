import { useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { getImageFromStorage } from "../../../lib/api";
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
    getImageMeasuring("about/measuring tape.png")
  }, [getImageIdea, getImageMeasuring]);

  return (
    // <section id="about" className="fullscreen-container">
    //   <div className="image-container-flex about-color">
    //     <img src={imageUrl} />
    //     <div className="about-description">
    //       <h1>About</h1>
    //       <p>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
    //         maximus finibus leo in ultricies. Integer diam purus, tempor id
    //         magna at, dictum molestie quam. Pellentesque id massa posuere tortor
    //         suscipit tincidunt. Duis porttitor tincidunt imperdiet. Suspendisse
    //         potenti. Donec tempus dictum porttitor. Mauris volutpat ac massa sit
    //         amet semper. Donec nibh lacus, imperdiet id bibendum ut, iaculis
    //         vulputate sapien. Vivamus eget condimentum justo. Maecenas
    //         condimentum, mauris eget placerat viverra, quam sem efficitur felis,
    //         at blandit nunc urna et libero.
    //       </p>
    //     </div>
    //   </div>
    // </section>
    <section id="about" className="fullscreen-container d-flex about-color">
      <div className="row">
        <div className="col-md">
          <div className="container-md">
            <h1>What we do</h1>
            <p>
              We are <strong>ZychFurniture</strong> and we are here to make your
              dream garden funrniture. All the furniture we make is hand crafted
              made from any type of wood you desire. Furniture we make are
              single or double swings to enjoy the weather while your sipping on
              your favourite beverage and pergolas to shield you from next heavy
              rain. The design is based on your idea and vision. We simply make
              your idea come to reality.
            </p>
            <div className="image-container-flex">
              <img src={imageUrlMeasuring} />
            </div>
          </div>
        </div>
        <div className="col-md">
          <div className="container-md">
            <h1>How we do it</h1>
            <p>
              The process is quite simple on your side. What we need you to do
              is most like already done. It's the{" "}
              <strong>idea</strong> we need from you. Just put that idea on
              paper, draw it out as best as you can. We will then come to your
              house discuss the details with you. Details such as position in
              the garden, size, wood type, colour and we will also take all the
              needed measurments. When thats done, we make everything at in the 
              workshop and when its done, we bring all the materials to you and
              put everything together.
            </p>
            <div className="image-container-flex">
              <img src={imageUrlIdea} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
