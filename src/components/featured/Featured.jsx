import "./featured.css";
const Featured = ({ featured }) => {
  // console.log(featured);
  const hanoi = featured.filter((item) => item.city === "Ha Noi");
  const hcm = featured.filter((item) => item.city === "Ho Chi Minh");
  const danang = featured.filter((item) => item.city === "Da nang");

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="./images/hanoi.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{hanoi.length} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./images/hcm.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{hcm.length} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./images/danang.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{danang.length} properties</h2>
        </div>
      </div>
    </div>
  );
};
export default Featured;
