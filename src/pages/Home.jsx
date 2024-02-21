import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../store/slices/products/ProductsSlice";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { getCurrentUser } from "../store/slices/user/UserSlice";

const Home = () => {
  // dispatch
  const dispatch = useDispatch();

  // get products and get user
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Navbar />
      <About />
      <div className="products-section">
        <h2>Best Sell</h2>
        <h3>Discover top-selling products and exclusive deals at TradeMate</h3>
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
