const UserService = require("../models/userService");

const newUserService = async (req, res, next) => {
  const {
    fullName,
    // phone,
    // phone2,
    // address,
    // country,
    //cityName,
    status,
    email,
  } = req.body;

  const userService = new UserService({
    fullName:fullName.trim(),
    // phone,
    // phone2,
    // address,
    // country,
    // cityName,
    status,
    email:email.trim(),
  });

  console.log(fullName);
  const findUser=await UserService.find({email:email})
  if(!findUser.length){
    await userService.save();
    res.json({
      status: "created userService",
    });
  }else{
    console.log("user find in BD")
  }
};

const searchUser = async (req, res) => {
  const emailUser = req.params.emailUser.trim();
  console.log(emailUser)
  const find = await UserService.find({ email: emailUser });
  if (find.length) {
    res.status(200).json({
      msg: "user find",
      payload:find
    });
  }else res.status(205).json({
    msg:"user not found"
  })
};

module.exports = {
  newUserService,
  searchUser,
};
