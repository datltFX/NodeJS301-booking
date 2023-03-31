import "@fortawesome/fontawesome-free/css/all.css";
import "./navBarItem.css";
const NavBarItem = (props) => {
  return (
    <div className="navBarList">
      {props.items.map((item, i) => (
        <div
          key={i}
          className={item.active ? "navBarListItem active" : "navBarListItem"}
        >
          <i className={item.icon} />
          <span>{item.type}</span>
        </div>
      ))}
    </div>
  );
};
export default NavBarItem;
