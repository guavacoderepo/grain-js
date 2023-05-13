const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// load dot env file
dotenv.config({ path: ".config/config.env" });

const app = express();

// import middlewares
app.use(express.json());
app.use(cors());

// set port
const port = process.env.PORT || 3001;

// listen to req
app.listen(port, () => {
  console.log(`connected to port ${port}`);
});

// connect to mongo db
connectDB();
