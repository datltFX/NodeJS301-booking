import "./footer.css";

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="fLists">
        {props.items.map((item, i) => (
          <ul key={i} className="fList">
            {item.col_values.map((col, j) => (
              <li key={j} className="fListItem">
                {col}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Footer;
