import "./propertyList.css";

const PropertyList = ({ typeHotel }) => {
  const hotel = typeHotel.filter((hotel) => hotel.type === "hotel");
  const apart = typeHotel.filter((hotel) => hotel.type === "apartment");
  const resort = typeHotel.filter((hotel) => hotel.type === "resort");
  const villas = typeHotel.filter((hotel) => hotel.type === "villa");
  const cabin = typeHotel.filter((hotel) => hotel.type === "cabin");
  return (
    <div className="pList">
      <div className="pListItem">
        <img src="./images/type_1.webp" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Hotel</h1>
          <h2>{hotel.length} hotel</h2>
        </div>
      </div>
      <div className="pListItem">
        <img src="./images/type_2.jpg" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Apartments</h1>
          <h2>{apart.length} apartments</h2>
        </div>
      </div>
      <div className="pListItem">
        <img src="./images/type_3.jpg" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Resorts</h1>
          <h2>{resort.length} resorts</h2>
        </div>
      </div>
      <div className="pListItem">
        <img src="./images/type_4.jpg" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Villas</h1>
          <h2>{villas.length} villas</h2>
        </div>
      </div>
      <div className="pListItem">
        <img src="./images/type_5.jpg" alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Cabins</h1>
          <h2>{cabin.length} cabins</h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
