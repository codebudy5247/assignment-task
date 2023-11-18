const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
let app = express();
const Route = require("./routes");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use("/api", Route);

app.get("/", (req, res) => {
  res.send("APi is running!");
});

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ashekhar5247:06hzWfw5f6Mt6xbA@cluster0.pa2pn3k.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("DB connected!");
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

const port = 1337
app.listen(port, async () => {
  console.log(`Server running at port ${port}`);
  await connectDB();
});
