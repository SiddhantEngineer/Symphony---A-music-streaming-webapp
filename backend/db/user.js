const UserDB = {};

UserDB.Init = async function (mongoose) {
  UserDB.userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  });

  UserDB.userCollection = await mongoose.model("users", UserDB.userSchema);
};

UserDB.AddUser = async function (username, email, passwordHash) {
  let response = "";
  await UserDB.userCollection
    .create({
      name: username,
      email: email,
      passwordHash: passwordHash,
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

//just a abstraction for various database interactions
UserDB.LoginUsername = async function (username, passwordHash) {
  const userData = {
    isValid: false,
    userID: "",
  };
  await UserDB.FindOne({ name: username })
    .then((data) => {
      if (data) {
        if (passwordHash === data.passwordHash) {
          userData.isValid = true;
          userData.userID = data._id;
        }
      }
    })
    .catch((error) => {
      console.log("ERROR! LoginUsername: " + error);
    });
  return userData;
};

UserDB.LoginEmail = async function (email, passwordHash) {
  const userData = {
    isValid: false,
    userID: "",
  };
  await UserDB.FindOne({ email: email })
    .then((data) => {
      if (data) {
        if (passwordHash === data.passwordHash) {
          userData.isValid = true;
          userData.userID = data._id;
        }
      }
    })
    .catch((error) => {
      console.log("ERROR! LoginEmail: " + error);
    });
  return userData;
};

UserDB.FindOne = async function (object) {
  var data;
  await UserDB.userCollection.collection
    .findOne(object)
    .then((d) => {
      data = d;
    })
    .catch((error) => {
      console.log("ERROR! FindOne: " + error);
    });
  return data;
};

UserDB.All = async () => {
  let data = await UserDB.userCollection.find();
  data = data.map((data) => ({ name: data.name, email: data.email }));
  return data;
};

module.exports = UserDB;
