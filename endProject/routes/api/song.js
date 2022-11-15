const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

const multer = require("../../config/multerTypes");
const uploadImgMulter = multer.createMulter("uploads/", 3000000, {
  type: multer.allowedTypes.img,
});

const usersModule = require("../../models/users.model");
const songModel = require("../../models/songs.model");
const songValidation = require("../../validation/song.validation");
const authMiddleware = require("../../middleware/auth.middleware");
const sellerMiddleware = require("../../middleware/seller.middleware");
const CustomRes = require("../../classes/CustomErr");
const usersValidation = require("../../validation/users.validation");

router.get("/", async (req, res) => {
  try {
    const songs = await songModel.selectAllSongs();
    res.json(songs);
  } catch (err) {
    res.status(401).json(err);
  }
});

router.get("/:song", async (req, res) => {
  try {
    const songToSearch = req.params.song;
    const songToShow = await songModel.selectSong(songToSearch);
    console.log(songToShow);
    res.json(songToShow);
  } catch (err) {
    res.status(401).json(err);
  }
});

// router.get("/artist/:artist", async (req, res) => {
//   try {
//     const songs = await songModel.selectSongsByArtist(req.params.artist);
//     res.json(songs);
//   } catch (err) {
//     res.status(401).json(err);
//   }
// });
router.put("/favorites/add", authMiddleware, async (req, res) => {
  try {
    const favSong = await usersModule.updateFavorites(
      req.body.song,
      req.body.email,
      "add"
    );
    res.json(
      new CustomRes(CustomRes.STATUSES.ok, "new song added to favorites")
    );
  } catch (err) {
    res.status(401).json(err);
  }
});
router.put("/favorites/remove", authMiddleware, async (req, res) => {
  try {
    const favSong = await usersModule.updateFavorites(
      req.body.song,
      req.body.email,
      "remove"
    );
    res.json(
      new CustomRes(CustomRes.STATUSES.ok, "song removed from favorites")
    );
  } catch (err) {
    res.status(401).json(err);
  }
});

router.get("/favorites/:email", authMiddleware, async (req, res) => {
  try {
    const validatedValue = await usersValidation.validateEmailSchema({
      email: req.userData.email,
    });
    console.log(validatedValue, "ere");
    const favSongs = await usersModule.selectFavsByEmail(validatedValue.email);
    console.log(favSongs, "val");
    if (!favSongs) {
      res.json(
        new CustomRes(CustomRes.STATUSES.failed, "No Songs In Favorites")
      );
    }
    res.json(favSongs.favoriteSongs);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

router.post(
  "/",
  authMiddleware,
  sellerMiddleware,
  uploadImgMulter.single("productImage"),
  async (req, res) => {
    try {
      const validateNewSong = await songValidation.validateNewSongSchema(
        req.body
      );
      await songModel.insertSong(
        validateNewSong.name,
        validateNewSong.description,
        validateNewSong.lyric,
        validateNewSong.artist,
        req.userData._id
      );
      res.json(new CustomRes(CustomRes.STATUSES.ok, "new song added"));
    } catch (err) {
      if (req.file) fs.unlink(req.file.path);
      console.log(err);
      res.status(401).json(err);
    }
  }
);

module.exports = router;
