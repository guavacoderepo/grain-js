const mongoose = require("mongoose");

module.exports = connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });
  console.log(`Mongo connected to ${conn.connection.host}`);
};
