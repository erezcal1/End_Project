const CustomRes = require("../classes/CustomErr");
const jwt = require("../config/jwt");
const usersModel = require("../models/users.model");

module.exports = async (req, res, next) => {
  try {
    let dataFromToken = await jwt.verifyToken(req.headers["x-auth-token"]);
    let userData = await usersModel.selectUserByEmail(dataFromToken.email);
    if (userData.length <= 0)
      throw new CustomRes(CustomRes.STATUSES.failed, "Invalid Token");
    req.userData = userData[0];
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
  }
};
