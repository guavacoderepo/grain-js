const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");

// import routes
const auth = require("./routes/auth");
const user = require("./routes/users");
const facilities = require("./routes/facilities");
const famers = require("./routes/farmers");

// load dot env file
dotenv.config({ path: "./config/config.env" });

const app = express();

// import middlewares
app.use(express.json());
app.use(cors());

// import api
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/facilities", facilities);
app.use("/api/v1/famers", famers);

// error handler
app.use(errorHandler);

// set port
const port = process.env.PORT || 3001;

// listen to req
app.listen(port, () => {
  console.log(`connected to port ${port}`);
});

// connect to mongo db
connectDB();
