//============================================
//Thirdparty modules
//============================================
const express = require("express");
const app = express();
const cors = require("cors");
const DBConnection = require("./db/connect");
DBConnection.Init();

//============================================
//Routes
//============================================
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");

//============================================
//Driver Code
//============================================
app.use(express.static("./public"));
app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server serving at PORT: " + (process.env.PORT || 5000));
});
