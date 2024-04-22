const SongDB = {};

SongDB.isInit = false;

SongDB.Init = async function (mongoose) {
  if (SongDB.isInit) {
    return;
  }
  SongDB.isInit = true;

  SongDB.userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  });

  SongDB.songCollection = await mongoose.model("songs", SongDB.userSchema);
};

SongDB.RemoveSong = async function (song) {
  let response = "Success";
  console.log("SongDeleting: ", song);
  await SongDB.songCollection
    .findOneAndDelete(song)
    .then((data) => {
      console.log(data);
      response = "Success";
    })
    .catch((err) => {
      response = "Error";
      console.log(err);
    });
  console.log("DELELTED SONG: ", song);
  return response;
};

SongDB.AddSong = async function (name, artist, src) {
  let response = "";
  let data = await SongDB.songCollection.find();
  await SongDB.songCollection
    .create({
      name: name,
      artist: artist,
      src: src,
    })
    .then(() => {
      response = "Success";
    })
    .catch((err) => {
      console.log(err);
      response = "Error";
    });
  return response;
};

SongDB.All = async () => {
  let data = await SongDB.songCollection.find();
  data = data.map((data) => ({
    name: data.name,
    artist: data.artist,
    src: data.src,
  }));
  return data;
};

module.exports = SongDB;
