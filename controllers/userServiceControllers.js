
const UserService = require("../models/userService");

const newUserService=async (req, res, next) => {
    const {
        fullName,
        // phone,
        // phone2,
        // address,
        // country,
        //cityName,
        status,
        email
    } = req.body;
    
    const userService = new UserService({
        fullName,
        // phone,
        // phone2,
        // address,
        // country,
        // cityName,
        status,
        email
    });

    console.log(fullName)
    await userService.save();
    res.json({
      status: "created userService",
    });
  }
  
  module.exports = {
    newUserService
  };