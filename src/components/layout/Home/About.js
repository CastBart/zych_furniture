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
    <section id="about" className="fullscreen-container d-flex">
      <div className="image-description">
        <h1></h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
          finibus leo in ultricies. Integer diam purus, tempor id magna at,
          dictum molestie quam. Pellentesque id massa posuere tortor suscipit
          tincidunt. Duis porttitor tincidunt imperdiet. Suspendisse potenti.
          Donec tempus dictum porttitor. Mauris volutpat ac massa sit amet
          semper. Donec nibh lacus, imperdiet id bibendum ut, iaculis vulputate
          sapien. Vivamus eget condimentum justo. Maecenas condimentum, mauris
          eget placerat viverra, quam sem efficitur felis, at blandit nunc urna
          et libero.
        </p>
      </div>
      <div className="image-container-flex">
        <img src={imageUrl}/>
      </div>
    </section>
  );
};
export default About;
