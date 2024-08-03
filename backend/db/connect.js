const DBConnection = {};
const mongoose = require("mongoose");

DBConnection.Init = async () => {
  // const uri =
  // const uri = "mongodb://localhost:27017";
  const uri = process.env.MONGODB_URI;
  console.log("Connecting To DB at: ", uri);
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
    dbName: "symphony",
  };
  +(await connect(uri, clientOptions));
};

async function connect(uri, clientOptions) {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    console.log("WAITING FOR CONNECTIOn");
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log("ERROR in connection", err);
  }
}

process.on("SIGINT", async () => {
  console.log("Received SIGINT signal. Closing MongoDB connection...");
  await mongoose.disconnect();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM signal. Closing MongoDB connection...");
  await mongoose.disconnect();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

module.exports = DBConnection;
