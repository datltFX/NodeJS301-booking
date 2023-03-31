import { useState } from "react";
import ReverseBook from "../reverseBook/ReverseBook";
import "./detailItem.css";

const DetailItem = ({ detail, itemSearch }) => {
  // console.log(detail);
  // console.log(itemSearch);

  const [modal, setModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [indexImage, setIndexImage] = useState("");

  //event click image
  const imageModalHandler = (i) => {
    setIndexImage(i);
    setModal(true);
  };

  //hide
  const closeHandler = () => {
    setModal(false);
    setBookModal(false);
  };

  //moving slide
  const moveSlideHandler = (leftright) => {
    let newSlide;
    if (leftright === "left") {
      newSlide = indexImage === 0 ? 5 : indexImage - 1;
    } else {
      newSlide = indexImage === 5 ? 0 : indexImage + 1;
    }
    setIndexImage(newSlide);
  };
  //reverse
  const bookingHandler = () => {
    setBookModal(true);
  };

  //render
  return (
    <div>
      {detail ? (
        <div className="detail">
          <h1 className="detailTitle">{detail.name}</h1>
          <div className="detailAddress">
            <i className="fa fa-location-dot" />
            <span>{detail.address}</span>
          </div>
          <span className="detailDistance">
            Excellent location - {detail.distance}m from center
          </span>
          <span className="detailPriceHighlight">
            Book a stay over {detail.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="detailImages">
            {detail.photos.map((photo, i) => (
              <div className="detailImgWrapper" key={i}>
                <img
                  src={photo}
                  alt=""
                  className="detailImg"
                  onClick={() => {
                    imageModalHandler(i);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="detailDetails">
            <div className="detailDetailsTexts">
              <h1 className="detailTitle">{detail.title}</h1>
              <p className="detailDesc">{detail.desc}</p>
            </div>
            <div className="detailDetailsPrice">
              <h2>
                <b>${detail.cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={bookingHandler}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/*--------------- displaymodal----------------- */}
      {modal && (
        <div>
          <div className="backdropDetail" onClick={closeHandler} />
          <div className="modalDetail">
            <i
              className="fas fa-times-circle closeDetail"
              onClick={closeHandler}
            />
            <i
              className="fas fa-chevron-circle-left arrowLeft"
              onClick={() => moveSlideHandler("left")}
            />
            <img src={detail.photos[indexImage]} alt="" />
            <i
              className="fas fa-chevron-circle-right arrowRight"
              onClick={() => moveSlideHandler("right")}
            />
          </div>
        </div>
      )}
      {bookModal && (
        <div>
          <div className="backdropDetail" onClick={closeHandler} />
          <div className="modalBooking">
            <ReverseBook
              bookSearch={itemSearch}
              onClose={closeHandler}
              hotel={detail}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailItem;
