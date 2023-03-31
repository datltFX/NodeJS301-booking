const User = require("../models/user");
const Transaction = require("../models/transaction");
const Hotel = require("../models/hotel");
const Room = require("../models/room");

class AdminController {
  //login admin
  postLogin = (req, res, next) => {
    // console.log(req.body);
    User.findOne({ username: req.body.username }).then((user) => {
      if (!user) {
        res.status(400).send("User not found!!");
      } else {
        if (user.password === req.body.password) {
          if (user.isAdmin) {
            res.status(200).send(user);
          } else {
            return res.status(400).send("You are not authorized!");
          }
        } else {
          return res.status(400).send("Password  is not correct!!!");
        }
      }
    });
  };
  //get users
  getUsers = (req, res, next) => {
    User.find()
      .then((users) => res.status(200).send(users))
      .catch((err) => console.log(err));
  };

  //get transactions
  getTransactions = (req, res, next) => {
    Transaction.find()
      .populate("hotel")
      .then((transactions) => res.status(200).send(transactions))
      .catch((err) => console.log(err));
  };
  //----------------------Hotel----------------------

  //delete hotel
  postDeleteHotel = (req, res, next) => {
    // console.log(req.body);
    Transaction.find({ hotel: req.body.id })
      .then((tran) => {
        // console.log(tran);
        if (tran.length > 0) {
          res.status(400).send("Cannot Delete!!!");
        } else {
          Hotel.findByIdAndDelete(req.body.id)
            .then((result) => res.status(200).send(result))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  //add new hotel
  postAddHotel = (req, res, next) => {
    // console.log(req.body);
    const newHotel = new Hotel({
      ...req.body,
      photos: req.body.photos.split(","),
    });
    // console.log(newHotel);
    newHotel
      .save()
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  };

  //get edit-hotel
  getEditHotel = (req, res, next) => {
    // console.log(req.params);
    Hotel.findById(req.params.hotelId)
      .then((hotel) => res.status(200).send(hotel))
      .catch((err) => console.log(err));
  };

  //edit hotel
  postEditHotel = (req, res, next) => {
    // console.log(req.body);
    Hotel.findByIdAndUpdate(
      req.params.hotelId,
      { $set: { ...req.body, photos: req.body.photos.split(",") } },
      { new: true }
    )
      .then((hotel) => res.status(200).send("success"))
      .catch((err) => console.log(err));
  };
  //----------------------Room----------------------

  //get Rooms
  getRooms = (req, res, next) => {
    // console.log(req.params);
    Room.find()
      .then((result) => res.status(200).send(result))
      .catch((err) => console.log(err));
  };

  //delete room
  postDeleteRoom = (req, res, next) => {
    // console.log(req.body);
    Transaction.find({
      "room.roomId": { $eq: req.body.id },
    })
      .then((trans) => {
        // console.log("trans:", trans);
        if (trans.length > 0) {
          res.status(400).send("Cannot Delete!!!");
        } else {
          //delete roomId in hotel collection
          Hotel.find({ rooms: { $in: [req.body.id] } })
            .then((hotels) => {
              const hotelIds = hotels.map((hotel) => hotel._id);
              hotelIds.forEach((id) => {
                Hotel.findOneAndUpdate(
                  { _id: id },
                  { $pull: { rooms: req.body.id } }
                ).then((result) => {
                  console.log(result);
                });
              });
            })
            .catch((err) => console.log(err));

          //delete room
          Room.findByIdAndDelete(req.body.id)
            .then((result) => res.status(200).send(result))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  //add new room
  postAddRoom = (req, res, next) => {
    // console.log(req.body);
    const newRoom = new Room({
      title: req.body.title,
      price: req.body.price,
      maxPeople: req.body.maxPeople,
      desc: req.body.desc,
      roomNumbers: req.body.rooms.split(","),
    });
    newRoom
      .save()
      .then((result) => {
        // console.log(result.id);
        Hotel.findOne({ _id: req.body.hotel }).then((hotel) => {
          hotel.rooms.push(result.id);
          hotel.save();
        });
        res.status(200).send("success!");
      })
      .catch((err) => console.log(err));
  };

  //get edit-room
  getEditRoom = (req, res, next) => {
    // console.log(req.params);
    Room.findById(req.params.roomId)
      .then((room) => res.status(200).send(room))
      .catch((err) => console.log(err));
  };

  //edit room
  postEditRoom = (req, res, next) => {
    console.log(req.body.hotel);
    // console.log(req.body);
    Room.findByIdAndUpdate(
      req.params.roomId,
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          maxPeople: req.body.maxPeople,
          desc: req.body.desc,
          roomNumbers:
            typeof req.body.rooms === "string"
              ? req.body.rooms.split(",")
              : req.body.rooms,
        },
      },
      { new: true }
    )
      .then((result) => {
        Hotel.findOne({ _id: req.body.hotel }).then((hotel) => {
          if (hotel.rooms.includes(req.params.roomId)) {
            res.status(200).send("no push!");
          } else {
            hotel.rooms.push(result.id);
            hotel.save();
            res.status(200).send("push room success!");
          }
        });
      })
      .catch((err) => console.log(err));
  };
}
module.exports = new AdminController();
