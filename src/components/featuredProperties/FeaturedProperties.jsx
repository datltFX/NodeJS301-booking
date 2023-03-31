import { useNavigate } from "react-router-dom";
import "./featuredProperties.css";

const FeaturedProperties = ({ rating }) => {
  const navigate = useNavigate();
  //sang trang detail
  const handlerDetail = (e) => {
    navigate(`/detail/${e}`, {
      state: {
        date: [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ],
        option: { adult: 1, children: 0, room: 1 },
      },
    });
  };

  //render
  return (
    <div className="fp">
      {rating.map((item, i) => (
        <div key={i} className="fpItem" onClick={() => handlerDetail(item._id)}>
          <img src={item.photos[0]} alt="" className="fpImg" />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Staring from ${item.cheapestPrice}</span>
          {/* <div className="fpRating">
            <button>{item.rate}</button>
            <span>{item.type}</span>
          </div> */}
        </div>
      ))}
    </div>
  );
};
export default FeaturedProperties;
