const CustomRes = require("../classes/CustomErr");

module.exports = (req, res, next) => {
  if (req.userData && req.userData.isSeller) {
    next();
  } else {
    res
      .status(403)
      .json(
        new CustomRes(CustomRes.STATUSES.failed, "you cant access this api")
      );
  }
};
