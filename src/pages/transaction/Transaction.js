import footer from "../../data/footer.json";
import "./transaction.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/contact/Contact";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/store";
import { format } from "date-fns";
import axiosClient from "../../axios/axios";

const Transaction = () => {
  const userCtx = useContext(Context);
  // console.log(userCtx.user.username);
  const [transactions, setTransactions] = useState([]);

  //get transaction for user
  useEffect(() => {
    axiosClient
      .get(`/transaction/${userCtx.user.username}`)
      .then((res) => {
        // console.log(res.data);
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  }, [userCtx.user.username]);

  //render
  return (
    <div>
      <Navbar />
      <div className="trans">
        {transactions.length === 0 ? (
          <h1>You don't have transaction!</h1>
        ) : (
          <table border="1" className="transTable">
            <caption>Your Transactions</caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans, i) => (
                <tr className={i % 2 === 0 ? "tableRow" : ""} key={i}>
                  <td>{i + 1}</td>
                  <td>{trans.hotel.name}</td>
                  <td>{trans.room.map((roo) => roo.numberRoom).toString()}</td>
                  <td>{`${format(
                    new Date(trans.dateStart),
                    "dd/MM/yyyy"
                  )} - ${format(new Date(trans.dateEnd), "dd/MM/yyyy")}`}</td>
                  <td>${trans.price}</td>
                  <td>{trans.payment}</td>
                  <td className={trans.status.toLowerCase()}>
                    <span>{trans.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Contact />
        <Footer items={footer} />
      </div>
    </div>
  );
};

export default Transaction;
