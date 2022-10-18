const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  lyrics: { type: Number, default: 0 },
  image: { type: String },
  artist: { type: String, required: true },
  adminId: { type: Schema.Types.ObjectId, ref: "Users" },
});

const Products = mongoose.model("Products", productSchema);

const selectAllSongs = () => {
  return Products.find();
};
const selectSongsByArtist = (artist) => {
  return Products.find((song) => song.artist === artist);
};
const selectSong = (songName) => {
  return Products.find((song) => song.name === songName);
};
const insertSong = (name, description, lyrics, image, artist, adminId) => {
  const product = new Products({
    name,
    description,
    lyrics,
    image,
    artist,
    adminId,
  });
  return product.save();
};

module.exports = {
  selectAllSongs,
  insertSong,
  selectSongsByArtist,
  selectSong,
};
