import BrandsCarousel from "../components/HomeComponents/BrandsCarousel.jsx";
import Hero from "../components/HomeComponents/Hero.jsx";
import Category from "../components/Category.jsx";
import FlashDeals from "../components/HomeComponents/FlashDeals.jsx";

const Home = () => {
  return (
    <>
      <Hero limit={40} />
      <FlashDeals limit={8} hours={6} />
      <Category limit={8} />
      <BrandsCarousel />
    </>
  );
};

export default Home;
