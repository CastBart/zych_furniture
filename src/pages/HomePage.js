import About from "../components/layout/Home/About";
import Contact from "../components/layout/Home/Contact";
import MyCarousel from "../components/layout/Home/MyCarousel";
// import Pricing from "../components/layout/Home/Pricing";
import Products from "../components/products/Products";

const HomePage = () => {
  return (
    <section>
      <MyCarousel />
      <About />
      {/* <Pricing /> */}
      <Products />
      <Contact />
    </section>
  );
};

export default HomePage;
