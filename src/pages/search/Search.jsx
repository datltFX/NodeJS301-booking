import footer from "../../data/footer.json";
import "./search.css";
import Navbar from "../../components/navbar/Navbar";
import SearchList from "../../components/searchList/SearchList";
import SearchPopup from "../../components/searchPopup/SearchPopup";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/contact/Contact";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../../axios/axios";

const Search = () => {
  //lay state tu location
  const { state } = useLocation();
  // console.log(state);
  const [hotelSearch, setHotelSearch] = useState([]);

  useEffect(() => {
    const data = {
      destination: state.destination,
      date: state.date,
      option: state.option,
    };
    axiosClient
      .post("/search", data)
      .then((res) => {
        console.log(res.data);
        setHotelSearch(res.data);
      })
      .catch((err) => console.log(err));
  }, [state]);

  //render
  return (
    <div>
      <Navbar />
      <div className="searchContainer">
        <div className="searchListContainer">
          <div className="searchWrapper">
            <SearchPopup popup={state} />
            <div className="searchResult">
              {hotelSearch.length > 0 ? (
                <SearchList items={hotelSearch} search={state} />
              ) : (
                <h1 style={{ padding: "100px" }}>Not Found Hotel!</h1>
              )}
            </div>
          </div>
        </div>
        <Contact />
        <Footer items={footer} />
      </div>
    </div>
  );
};

export default Search;
