const mongoose = require("mongoose");
const Room = require("./room");
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  cheapestPrice: { type: Number, required: true },
  distance: { type: Number, required: true },
  photos: { type: [String] },
  desc: {
    type: String,
    required: true,
  },
  // rating: { type: Number, required: true },
  featured: { type: Boolean, required: true },
  title: { type: String },
  rooms: {
    type: [{ type: Schema.Types.ObjectId, ref: "Room", required: true }],
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
