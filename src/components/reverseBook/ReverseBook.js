import "./reverseBook.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/store";
import { useEffect } from "react";
import axiosClient from "../../axios/axios";

const ReverseBook = ({ bookSearch, onClose, hotel }) => {
  const navigate = useNavigate();
  const userCtx = useContext(Context);

  // console.log(bookSearch);

  const [date, setDate] = useState(bookSearch.date);
  const [cardNumber, setCardNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [room, setRoom] = useState([]);
  const [days, setDays] = useState(
    Math.floor(
      new Date(
        date[0].endDate.getTime() - new Date(date[0].startDate.getTime())
      ) /
        (24 * 3600 * 1000)
    )
  );
  const [selectRoom, setSelectRoom] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  // console.log(days);

  //set stayding days
  useEffect(() => {
    setDays(
      Math.floor(
        new Date(
          date[0].endDate.getTime() - new Date(date[0].startDate.getTime())
        ) /
          (24 * 3600 * 1000)
      )
    );
  }, [date]);

  //get room from hotel
  useEffect(() => {
    const roomId = {
      hotel: hotel,
      date: date,
      option: bookSearch.option,
    };
    axiosClient
      .post(`/room`, roomId)
      .then((res) => {
        // console.log(res.data);
        setRoom(res.data);
      })
      .catch((err) => console.log(err));
  }, [hotel, date, bookSearch]);

  //tick room
  const selectRoomHandler = (e, rooId, price) => {
    const checked = e.target.checked;
    const value = e.target.value;
    // console.log(checked);
    // console.log(value);
    // console.log(price);
    const dataRoom = { roomId: rooId, numberRoom: value, priceRoom: price };
    setSelectRoom(
      checked
        ? [...selectRoom, dataRoom]
        : selectRoom.filter(
            (item) => item.priceRoom !== price || item.numberRoom !== value
          )
    );
  };

  //total
  useEffect(() => {
    const total = selectRoom.reduce(
      (acc, item) => acc + item.priceRoom * (days === 0 ? 1 : days),
      0
    );
    setTotalBill(total);
  }, [selectRoom, days]);

  //Booking
  const bookingHandler = () => {
    const dataBook = {
      user: userCtx.user.username,
      hotel: hotel._id,
      room: selectRoom,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      price: totalBill,
      payment: paymentMethod,
      status: "booked",
    };
    // console.log(dataBook);
    axiosClient
      .post(`/transaction`, dataBook)
      .then((res) => {
        console.log(res.data);
        navigate("/transaction");
      })
      .catch((err) => console.log(err));
  };
  //render
  return (
    <div>
      {userCtx.user && (
        <div className="rContainer">
          <i className="fas fa-times-circle closeDetail" onClick={onClose} />
          <div className="rDatesInfo">
            <div className="rDates">
              <h3>Dates</h3>
              <DateRange
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                onChange={(item) => setDate([item.selection])}
                ranges={date}
              />
            </div>
            <div className="rInfo">
              <h3>Reserve Info</h3>
              <label>Your Full Name</label>
              <input type="text" placeholder={userCtx.user.fullName} />
              <label>Your Email</label>
              <input type="text" placeholder={userCtx.user.email} />
              <label>Your Phone Number</label>
              <input type="number" placeholder={userCtx.user.phoneNumber} />
              <label>Your identity Card Number</label>
              <input
                type="number"
                placeholder="Card Number"
                className="rInfoInput"
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
          </div>
          <h3 style={{ marginTop: "-20px" }}>Select your rooms:</h3>
          <div className="rRoom">
            {room &&
              room.map((item) => (
                <div className="rRoomItem" key={item._id}>
                  <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">
                      Max people: <b>{item.maxPeople}</b>
                    </div>
                    <div className="rPrice">${item.price}</div>
                  </div>
                  <div className="rSelectRooms">
                    {item &&
                      item.roomNumbers.map((roomNumber, i) => (
                        <div className="room" key={i}>
                          <label>{roomNumber}</label>
                          <input
                            value={roomNumber}
                            type="checkbox"
                            onChange={(e) =>
                              selectRoomHandler(e, item._id, item.price)
                            }
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
          <h3>Total Bill: ${totalBill} </h3>
          <div className="rBillBook">
            <select
              className="payment"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option>Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
            <button className="rButton" onClick={bookingHandler}>
              Reverve Now!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReverseBook;
