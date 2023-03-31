const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const hotelRoute = require("./routes/hotel");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

app.use(userRoute);
app.use(hotelRoute);
app.use("/admin", adminRoute);

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://Atom:node123456@cluster0.ad6pgpc.mongodb.net/asm?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5000);
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
  })
  .catch((err) => console.log(err));
