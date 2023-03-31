// import city from "../../data/city.json";
// import count from "../../data/type.json";
// import hotel from "../../data/hotel_list.json";
import { useState, useEffect } from "react";
import footer from "../../data/footer.json";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";
import axiosClient from "../../axios/axios";
const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [typeHotel, setTypeHotel] = useState([]);

  //get data hotel

  useEffect(() => {
    axiosClient
      .get("/hotels")
      .then((res) => {
        // console.log(res.data);
        setFeatured(res.data.filter((hotel) => hotel.featured === true));
        setTypeHotel(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //render
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured featured={featured} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList typeHotel={typeHotel} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties rating={featured} />
        <Contact />
        <Footer items={footer} />
      </div>
    </div>
  );
};

export default Home;
