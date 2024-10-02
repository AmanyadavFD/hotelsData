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

async function hotelByName(name) {
  try {
    const getHotelByName = await Hotel.findOne({ name: name });
    console.log(getHotelByName);
    return getHotelByName;
  } catch (error) {}
}
hotelByName("New Hotel");

app.get("/hotels/name/:hotelName", async (req, res) => {
  try {
    const findHotelByName = await hotelByName(req.params.hotelName);
    if (findHotelByName) {
      res.status(201).json({
        message: "this is your hotel",
        findHotelByName: findHotelByName,
      });
    } else {
      res.status(404).json({ error: "hotels not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to find hotel by name." });
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
async function getAllHotels() {
  try {
    const allHotels = await Hotel.find();
    // console.log(allBooks);
    return allHotels;
  } catch (error) {
    console.log(error);
  }
}
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await getAllHotels();
    if (hotels.length != 0) {
      res
        .status(201)
        .json({ message: "Here is your all hotels", hotels: hotels });
    } else {
      res.status(404).json({ error: "hotels not found." });
    }
  } catch (error) {
    console.log(error);
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
