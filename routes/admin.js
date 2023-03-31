const express = require("express");
const AdminController = require("../controllers/admin");
const HotelController = require("../controllers/hotel");
const { verify } = require("../middleware/verify");
const router = express.Router();

//login admin
router.post("/login", AdminController.postLogin);
//get users
router.get("/users/:adminId", verify, AdminController.getUsers);
//get transactions
router.get("/transactions/:adminId", verify, AdminController.getTransactions);
//------------------HOTEL-----------------------------
//get hotels
router.get("/hotels/:adminId", verify, HotelController.getHotel);
//delete hotel
router.post("/delete-hotel/:adminId", verify, AdminController.postDeleteHotel);
//add new hotel
router.post("/add-hotel/:adminId", verify, AdminController.postAddHotel);
//get edit-hotel
router.get(
  "/edit-hotel/:adminId/:hotelId",
  verify,
  AdminController.getEditHotel
);
//edit hotel
router.post(
  "/edit-hotel/:adminId/:hotelId",
  verify,
  AdminController.postEditHotel
);
//------------------ROOM--------------------------
//get rooms
router.get("/rooms/:adminId", verify, AdminController.getRooms);
//delete room
router.post("/delete-room/:adminId", verify, AdminController.postDeleteRoom);
//add new room
router.post("/add-room/:adminId", verify, AdminController.postAddRoom);
//get edit-room
router.get("/edit-room/:adminId/:roomId", verify, AdminController.getEditRoom);
//edit room
router.post(
  "/edit-room/:adminId/:roomId",
  verify,
  AdminController.postEditRoom
);
module.exports = router;
