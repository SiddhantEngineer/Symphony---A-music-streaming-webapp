const router = require("express").Router();
const path = require("path");
const mongoose = require("mongoose");
const userDB = require("../db/user");
const multer = require("multer");
const crypto = require("crypto");

userDB.Init(mongoose);

router.use(multer().any());

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/admin.html"));
});

router.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/user.html"));
});

router.post("/userAdd", async (req, res) => {
  const response = await userDB.AddUser(
    req.body.name,
    req.body.email,
    toHash(req.body.password)
  );
  res.send(response);
});

router.get("/userList", async (req, res) => {
  const data = await userDB.All();
  console.log(data);
  res.json(data);
});

router.delete("/userDelete", async (req, res) => {
  console.log(req.body);
  const response = await userDB.RemoveUser({ name: req.body.name });
  res.send(response);
});

function toHash(string) {
  const hash = crypto.createHash("sha256");
  hash.update(string);
  return hash.digest("hex");
}

module.exports = router;
