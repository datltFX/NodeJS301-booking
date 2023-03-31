import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import "./searchPopup.css";

const SearchPopup = ({ popup }) => {
  const navigate = useNavigate();
  // console.log(popup);
  const [destination, setDestination] = useState(popup.destination);
  const [date, setDate] = useState(popup.date);
  const [option, setOption] = useState(popup.option);
  const [openDate, setOpenDate] = useState(false);

  // su kien nut search
  const handlerSearch = () => {
    // dua state vao local
    // console.log(destination, date, option);
    navigate("/search", {
      state: {
        destination,
        date,
        option,
      },
    });
  };

  //render
  return (
    <div className="popupSearch">
      <h1 className="ppTitle">Search</h1>
      <div className="ppItem">
        <label>Destination</label>
        <input
          type="text"
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </div>
      {/* -----------------------------date------------------------------ */}
      <div className="ppItem">
        <label>Check-in date</label>
        <span onClick={() => setOpenDate(!openDate)}>
          {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
            date[0].endDate,
            "MM/dd/yyyy"
          )}`}
        </span>

        {openDate && (
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            minDate={new Date()}
            onChange={(item) => setDate([item.selection])}
            ranges={date}
          />
        )}
      </div>
      {/* ---------------------------------option-------------------------------- */}
      <div className="ppItem">
        <label>Options</label>
        <div className="ppOptions">
          <div className="ppOptionItem">
            <span>
              Min price <small>per night</small>
            </span>
            <input type="number" className="ppOptionInput" />
          </div>
          <div className="ppOptionItem">
            <span>
              Max price <small>per night</small>
            </span>
            <input type="number" className="ppOptionInput" />
          </div>
          <div className="ppOptionItem">
            <span>Adult</span>
            <input
              type="number"
              className="ppOptionInput"
              value={option.adult}
              onChange={(e) =>
                setOption((prev) => {
                  return { ...prev, adult: e.target.value };
                })
              }
            />
          </div>
          <div className="ppOptionItem">
            <span>Children</span>
            <input
              type="number"
              className="ppOptionInput"
              value={option.children}
              onChange={(e) =>
                setOption((prev) => {
                  return { ...prev, children: e.target.value };
                })
              }
            />
          </div>
          <div className="ppOptionItem">
            <span>Room</span>
            <input
              type="number"
              className="ppOptionInput"
              value={option.room}
              onChange={(e) =>
                setOption((prev) => {
                  return { ...prev, room: e.target.value };
                })
              }
            />
          </div>
        </div>
      </div>
      <button onClick={handlerSearch}>Search</button>
    </div>
  );
};

export default SearchPopup;
