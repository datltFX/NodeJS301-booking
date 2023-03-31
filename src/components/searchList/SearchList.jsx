import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchList.css";

const SearchList = (props) => {
  // console.log(props.items);
  // console.log(props.search);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [imgModal, setImgModal] = useState("");

  //event click image
  const imageModalHandler = (i) => {
    setImgModal(props.items[i]);
    setModal(true);
  };

  //hide
  const closeHandler = () => {
    setModal(false);
  };
  //
  const detailHandler = (e) => {
    navigate(`/detail/${e}`, {
      state: props.search,
    });
  };

  //render
  return (
    <div>
      {props.items.map((item, index) => (
        <div className="searchItem" key={index}>
          <img
            src={item.photos[0]}
            alt=""
            className="siImg"
            onClick={() => imageModalHandler(index)}
          />
          <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}m from center</span>
            <span className="siTaxiOp">Free Breakfast</span>
            <span className="siSubtitle">{item.desc}</span>
            <span className="siFeatures">{item.type}</span>
            <span
              className={item.free_cancel ? "siCancelOp" : "siCancelOpHidden"}
            >
              Free cancellation
            </span>
            <span
              className={
                item.free_cancel ? "siCancelOpSubtitle" : "siCancelOpHidden"
              }
            >
              You can cancel later, so lock in this great price today!
            </span>
          </div>
          <div className="siDetails">
            <div className="siRating">
              <span>{item.rating ? item.rating : "Excellent"}</span>
              <button>Rate</button>
            </div>
            <div className="siDetailTexts">
              <span className="siPrice">${item.cheapestPrice}</span>
              <span className="siTaxOp">Includes taxes and fees</span>
              <button
                className="siCheckButton"
                onClick={() => detailHandler(item._id)}
              >
                See availability
              </button>
            </div>
          </div>
        </div>
      ))}
      {/*--------------- displaymodal----------------- */}
      {modal && (
        <div>
          <div className="backdrop" onClick={closeHandler} />
          <div className="modal">
            <i className="fas fa-times-circle close" onClick={closeHandler} />
            <img src={imgModal.photos[0]} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
