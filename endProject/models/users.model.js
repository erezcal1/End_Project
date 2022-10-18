const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recovery: {
    secretKey: { type: String },
    dateRecovery: { type: Date },
  },
  emailVerification: {
    didHeDoIt: { type: Boolean, default: false },
    websiteKey: { type: String },
    emailDate: { type: Date },
  },
  favoriteSongs: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
});

// create collection
const Users = mongoose.model("Users", userSchema);

// create new user
const insertUser = (firstName, lastName, email, password) => {
  const user = new Users({
    firstName,
    lastName,
    email,
    password,
  });
  return user.save();
};

const updateFavorites = (song, email, removeOrAdd) => {
  if (removeOrAdd === "add") {
    return Users.updateOne({ email }, { $push: { favoriteSongs: song } });
  } else if (removeOrAdd === "remove") {
    return Users.updateOne(
      { email },
      { $pull: { favoriteSongs: { $elemMatch: song } } }
    );
  }
};

const updateEmail = (email, key, date) => {
  return Users.updateOne(
    { email },
    { "emailVerification.websiteKey": key, "emailVerification.emailDate": date }
  );
};
const updateHeDidIt = (email, didHe) => {
  return Users.updateOne({ email }, { "emailVerification.didHeDoIt": didHe });
};

const updateRecovery = (email, key, date) => {
  return Users.updateOne(
    { email },
    { "recovery.secretKey": key, "recovery.dateRecovery": date }
  );
};

const updatePassword = (email, password) => {
  return Users.updateOne({ email }, { password, "recovery.secretKey": "" });
};

const selectUserByEmail = (email) => {
  return Users.find({ email });
};
const selectSongsByEmail = (email) => {
  return Users.find({ email }, favoriteSongs);
};

module.exports = {
  insertUser,
  selectUserByEmail,
  updateRecovery,
  updatePassword,
  updateEmail,
  updateHeDidIt,
  updateFavorites,
  selectSongsByEmail,
};
