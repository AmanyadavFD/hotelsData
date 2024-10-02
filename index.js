require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

const Hotel = require("./models/hotel.models");

async function createHotel(hotel) {
  try {
    const hotelData = new Hotel(hotel);
    const saveHotelData = await hotelData.save();
    return saveHotelData;
  } catch (error) {
    console.log(error);
  }
}

app.post("/hotels", async (req, res) => {
  try {
    const addHotel = await createHotel(req.body);
    res
      .status(201)
      .json({ message: "Hotel added Successfully.", hotel: addHotel });
  } catch (error) {
    res.status(500).json({ error: "Failed to add hotel" });
  }
});

async function hotelDeleteBYID(hotelId) {
  try {
    const deleteHotelById = await Hotel.findByIdAndDelete(hotelId);
    return deleteHotelById;
  } catch (error) {
    console.log(error);
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deleteHotel = await hotelDeleteBYID(req.params.hotelId);
    if (deleteHotel) {
      res.status(200).json({ message: "Hotel Deleted Successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel." });
  }
});

async function updateHotelById(hotelId, dataToUpdate) {
  try {
    const hotelDeletedById = await Hotel.findByIdAndUpdate(
      hotelId,
      dataToUpdate,
      { new: true }
    );
    return hotelDeletedById;
  } catch (error) {
    console.log(error);
  }
}
app.get("/hotels/:hotelId", async (req, res) => {
  try {
    const hotelUpdate = await updateHotelById(req.params.hotelId, req.body);

    if (hotelUpdate) {
      res.status(201).json({
        message: "Hotel updated successfully.",
        hotelUpdate: hotelUpdate,
      });
    } else {
    }
  } catch (error) {
    res.status(505).json({ error: "Failed to update the hotel. " });
  }
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
