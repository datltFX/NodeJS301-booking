import footer from "../../data/footer.json";
import "./detail.css";
import Navbar from "../../components/navbar/Navbar";
import DetailItem from "../../components/detailItem/DetailItem";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../../axios/axios";

const Detail = () => {
  //lay state tu location
  const { state } = useLocation();
  // console.log(state);
  const params = useParams();
  const [detailHotel, setDetailHotel] = useState();
  // console.log(params.id);
  useEffect(() => {
    axiosClient
      .get(`/hotels/detail/${params.id}`)
      .then((res) => {
        // console.log(res.data);
        setDetailHotel(res.data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);
  // console.log(detailHotel);
  //anh hien thi
  return (
    <div>
      <Navbar />
      <div className="detailContainer">
        <DetailItem detail={detailHotel} itemSearch={state} />
        <Contact />
        <Footer items={footer} />
      </div>
    </div>
  );
};
export default Detail;
