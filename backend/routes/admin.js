const router = require("express").Router();
const path = require("path");
const mongoose = require("mongoose");
const userDB = require("../db/user");
const songDB = require("../db/song");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");

userDB.Init(mongoose);
songDB.Init(mongoose);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/admin.html"));
});

router.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/user.html"));
});

router.get("/song", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/song.html"));
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

router.delete("/userDelete", multer().any(), async (req, res) => {
  console.log(req.body);
  const response = await userDB.RemoveUser({ name: req.body.name });
  res.send(response);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/songsdata/100Hits2021")); // Destination folder where files will be saved
  },
  filename: function (req, file, cb) {
    if (file.mimetype !== "audio/mpeg") {
      cb(null, req.body.name + ".jpg"); // Use the original file name
    }
    cb(null, req.body.name + ".mp3"); // Use the original file name
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(new Error("File type not supported", false));
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/songList", async (req, res) => {
  const data = await songDB.All();
  res.json(data);
});

router.post(
  "/songAdd",
  upload.fields([
    { name: "mp3", maxCount: 1 },
    { name: "pic", maxCount: 1 },
  ]),
  async (req, res) => {
    let src = "http://localhost:5000/songsdata/100Hits2021/";
    src += req.body.name + ".mp3";
    let response = await songDB.AddSong(req.body.name, req.body.artist, src);
    res.send(response);
  }
);

router.delete("/songDelete", multer().any(), async (req, res) => {
  console.log(req.body.delete);
  let status = "OK";
  const rootpath = path.join(__dirname, "../public/songsdata/100Hits2021/");
  const dbStatus = await songDB.RemoveSong({ name: req.body.delete });
  if (dbStatus === "Error") {
    status = "ERROR";
  }
  fs.unlink(path.join(rootpath, req.body.delete + ".mp3"), (err) => {
    if (err) {
      console.log("ERROR: ", err);
      status = "ERROR";
    }
  });
  fs.unlink(path.join(rootpath, req.body.delete + ".jpg"), (err) => {
    if (err) {
      console.log("ERROR: ", err);
      status = "ERROR";
    }
  });
  res.send(status);
});

function toHash(string) {
  const hash = crypto.createHash("sha256");
  hash.update(string);
  return hash.digest("hex");
}

module.exports = router;
