const User = require("../models/user");
const Transaction = require("../models/transaction");

class UserController {
  //register
  postRegisterUser = (req, res, next) => {
    // console.log(req.body);
    const { username, fullname, email, phoneNumber, password } = req.body;

    User.findOne({ $or: [{ username: username }, { email: email }] })
      .then((user) => {
        if (user) {
          res.status(400).send("Username-Email is already existed");
        } else {
          const newUser = new User({
            username: username,
            fullName: fullname,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            isAdmin: false,
          });
          console.log(newUser);
          newUser.save();
          res.status(200).send("User has been created!!!");
        }
      })
      .catch((err) => console.log(err));
  };

  //login
  postLogin = (req, res, next) => {
    // console.log(req.body);
    User.findOne({ username: req.body.username }).then((user) => {
      if (!user) {
        res.status(400).send("User not found!!");
      } else {
        if (user.password === req.body.password) {
          res.status(200).send(user);
        } else {
          return res.status(400).send("Password  is not correct!!!");
        }
      }
    });
  };

  //new transaction
  postCreateTransaction = (req, res, next) => {
    // console.log(req.body);
    const transaction = new Transaction({
      user: req.body.user,
      hotel: req.body.hotel,
      room: req.body.room,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      price: req.body.price,
      payment: req.body.payment,
      status: req.body.status,
    });
    transaction
      .save()
      .then((result) => res.status(200).send("Success Booking!!!"))
      .catch((err) => console.log(err));
  };

  //get transaction
  getTransaction = (req, res, next) => {
    // console.log(req.params);
    Transaction.find({ user: req.params.username })
      .populate("hotel")
      .then((transactions) => res.status(200).send(transactions))
      .catch((err) => console.log(err));
  };
}
module.exports = new UserController();
