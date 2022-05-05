import { useState } from "react";
import MyCarousel from "../components/MyCarousel/MyCarousel";

const HomePage = () => {
  const [landingImageURL, setLandingImageURL] = useState("");

  return <MyCarousel />;
};

export default HomePage;
