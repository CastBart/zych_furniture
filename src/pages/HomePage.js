import About from "../components/layout/Home/About";
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
    </section>
  );
};

export default HomePage;
