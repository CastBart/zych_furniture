import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { getImageFromStorage } from "../lib/api";

const HomePage = () => {
  const [landingImageURL, setLandingImageURL] = useState("");
  useEffect(() => {
    getImageFromStorage("landing.jpeg").then(function (result) {
      setLandingImageURL(result);
    });
  }, []);

  console.log(landingImageURL);
  return (
    <section>
      <Image src={landingImageURL} />
    </section>
  );
};

export default HomePage;
