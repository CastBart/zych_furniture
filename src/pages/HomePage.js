import About from "../components/layout/Home/About";
import MyCarousel from "../components/layout/Home/MyCarousel";
import Pricing from "../components/layout/Home/Pricing";

const HomePage = () => {
  return (
    <section>
      <MyCarousel />
      <About />
      <Pricing />
    </section>
  );
};

export default HomePage;
