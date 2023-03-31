const express = require("express");
const HotelController = require("../controllers/hotel");
const router = express.Router();

//get all hotels
router.get("/hotels", HotelController.getHotel);
//get hotel-detail
router.get("/hotels/detail/:id", HotelController.getDetailHotel);
//search hotel
router.post("/search", HotelController.postSearchHotel);
//find room
router.post("/room", HotelController.postHotelRoom);

module.exports = router;
