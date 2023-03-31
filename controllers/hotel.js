const mongodb = require("mongodb");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

class HotelController {
  //get all hotel
  getHotel = (req, res, next) => {
    Hotel.find()
      .then((result) => {
        // console.log(result);
        res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  };

  //get detail hotel
  getDetailHotel = (req, res, next) => {
    // console.log(req.params.id);
    Hotel.findById(req.params.id)
      .then((hotel) => {
        // console.log(hotel);
        res.send(hotel);
      })
      .catch((err) => console.log(err));
  };

  //post search hotel
  postSearchHotel = async (req, res, next) => {
    // console.log(req.body);
    const destination = req.body.destination;
    const startDate = new Date(req.body.date[0].startDate);
    const endDate = new Date(req.body.date[0].endDate);
    const maxPeople = req.body.option.adult;
    const room = req.body.option.room; //so luong phong dat

    //tim phong theo so luong nguoi
    try {
      let hotelOk = [];
      const roomMax = await Room.find({
        maxPeople: { $gte: Number(maxPeople) },
      });
      const roomIds = roomMax.map((roo) => roo._id);
      const roomIds1 = roomMax.map((roo) => roo._id.toString());
      // console.log("---hotel.js40----", roomIds);

      //1.tim hotel theo dia diem va nhung phong thoa man so luong
      const firstHotels = await Hotel.find({
        city: { $all: [destination] },
        rooms: { $in: roomIds },
      });
      // console.log("----hotel.js45---", firstHotels);

      //2.duyet hotel trong trans
      for (let i = 0; i < firstHotels.length; i++) {
        let roomIdOkInHotel = [];
        let countRoomOkInHotel = 0;
        for (let j = 0; j < firstHotels[i].rooms.length; j++) {
          // console.log("----56----", firstHotels[i].rooms[j]);
          if (roomIds1.includes(firstHotels[i].rooms[j].toString())) {
            roomIdOkInHotel.push(firstHotels[i].rooms[j]); //push room trong hotel thoa man
            const room = await Room.findById(firstHotels[i].rooms[j]);
            countRoomOkInHotel += room.roomNumbers.length;
          }
        }

        // console.log("---70---", countRoomOkInHotel);
        // console.log("---71---", roomIdOkInHotel);

        //----check moi hotel trong a transanction
        const trans = await Transaction.find({
          "room.roomId": { $in: roomIdOkInHotel },
          hotel: firstHotels[i]._id,
        });
        // console.log("---777----", trans);

        let checkHotel = false;

        //loc trans trung ngay
        const transSameday = trans.filter(
          (tran) =>
            (tran.dateStart <= startDate && tran.dateEnd >= startDate) ||
            (tran.dateStart <= endDate && tran.dateEnd >= endDate)
        );
        // console.log("---82----", transSameday);
        let roomTran = [];
        transSameday.forEach((roT) => {
          roT.room.forEach((roo) => {
            roomTran.push(roo);
          });
        });
        // console.log("---89----", roomTran);
        const totalRoomInTranSameDay = roomTran.length;
        // console.log("---91----", totalRoomInTranSameDay);
        const totalRoomBlankInHotel =
          countRoomOkInHotel - totalRoomInTranSameDay;
        // console.log(
        //   "-Số lượng phòng trống trong khách sạn khi có giao dịch trùng với ngày tìm kiếm:",
        //   totalRoomBlankInHotel
        // );
        if (totalRoomBlankInHotel >= room) {
          checkHotel = true;
        }

        //duyet hotel  khong trung ngay trong tung transction
        for (let k = 0; k < trans.length; k++) {
          if (
            (endDate < trans[k].dateStart || startDate > trans[k].dateEnd) &&
            countRoomOkInHotel >= room
          ) {
            checkHotel = true;
          }
        }
        if (checkHotel) {
          hotelOk.push(firstHotels[i]);
        }
      }
      // console.log("---hotelOk----", hotelOk);
      res.status(200).send(hotelOk);
    } catch (err) {
      console.log(err);
    }
  };

  //post Room
  postHotelRoom = (req, res, next) => {
    // console.log(req.body);
    const hotel = req.body.hotel;
    const startDate = new Date(req.body.date[0].startDate);
    const endDate = new Date(req.body.date[0].endDate);
    const maxPeople = req.body.option.adult;

    //tim trans chua roomId
    Transaction.find({ "room.roomId": { $in: hotel.rooms } })
      .then((transRoom) => {
        // console.log("-----73-trans---", transRoom);
        //loc trans cung hotel
        const transHotel = transRoom.filter(
          (trans) => trans.hotel == hotel._id
        );
        // console.log("-----78-trans---", transHotel);
        //loc trans nam trong ngay chon
        const transSameday = transHotel.filter(
          (tran) =>
            (tran.dateStart <= startDate && tran.dateEnd >= startDate) ||
            (tran.dateStart <= endDate && tran.dateEnd >= endDate)
        );
        // console.log("---82----", transSameday);
        let roomTran = [];
        transSameday.forEach((roT) => {
          roT.room.forEach((roo) => {
            roomTran.push(roo);
          });
        });
        // console.log("----85----", roomTran);

        //------------------loc roomId khong co trong transaction
        const roomInTranSameday = roomTran.map((roo) => roo.roomId.toString());
        const numberRoomInTran = roomTran.map((roo) => roo.numberRoom);
        let roomNotTran = [];
        hotel.rooms.forEach((roo) => {
          const check = roomInTranSameday.includes(roo);
          if (check == false) {
            roomNotTran.push(roo);
          }
        });
        //xoa phan roomId trung nhau
        const uniqueSet = new Set(roomInTranSameday);
        const roomInTran = [...uniqueSet];
        // console.log("-----98-trans---", roomNotTran);
        // console.log("-----108-trans---", roomInTran);

        //loc tran chua hotel
        if (roomInTran.length > 0) {
          Room.find({ _id: { $in: roomInTran } })
            .then((rooms) => {
              // console.log(rooms);
              let roomOk = [];
              //duyet room check room(transaction)
              rooms.forEach((room) => {
                let roomBlank = [];
                room.roomNumbers.forEach((number) => {
                  const check = numberRoomInTran.includes(number);
                  if (check === false) {
                    roomBlank.push(number);
                  }
                });
                // console.log("--------124--------", roomBlank);
                if (roomBlank.length > 0) {
                  const newRoom = room;
                  // console.log("----128---", newRoom);
                  newRoom.roomNumbers = roomBlank;
                  roomOk.push(newRoom);
                }
              });
              // console.log("---129-------", roomOk);

              Room.find({ _id: { $in: roomNotTran } })
                .then((rooms) => {
                  // console.log(rooms);

                  const newRooms = [...rooms, ...roomOk];
                  const listRoom = newRooms.filter(
                    (roo) => roo.maxPeople >= maxPeople
                  );
                  // console.log("---132---", listRoom);
                  res.status(200).send(listRoom);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        } else {
          Room.find({ _id: { $in: roomNotTran } }).then((rooms) => {
            // console.log(rooms);
            const listRoom = rooms.filter((roo) => roo.maxPeople >= maxPeople);
            res.status(200).send(listRoom);
          });
        }
      })
      .catch((err) => console.log(err));
  };
}
module.exports = new HotelController();
