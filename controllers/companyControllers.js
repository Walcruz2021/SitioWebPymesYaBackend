const Company = require("../models/company");
//const imgbbUploader = require('imgbb-uploader')
let path = require('path')
let fs = require('fs')

const listCompanies = async (req, res) => {
  try {
    const listCompanies = await Company.find();
    if (listCompanies.length > 0) {
      res.status(200).json({
        listCompanies,
      });
    } else {
      res.status(204).json({
        msg: "there are no companies",
      });
    }
  } catch (err) {
    return err;
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    let response = await imgbbUploader(
      process.env.API_KEY_IMGBB,
      path.join(__dirname, `../files/${req.file.filename}`)
    );

    if (response) {
      console.log(
        fs.existsSync(path.join(__dirname, "../files/" + req.file.filename))
      );
      if (
        fs.existsSync(path.join(__dirname, "../files/" + req.file.filename)) &&
        req.file.filename !== "default-image.png"
      ) {
        fs.unlinkSync(path.join(__dirname, `../files/${req.file.filename}`));
      } else {
        console.log("no se encontro el archivo");
      }
    }
    await Company.findByIdAndUpdate(
      req.params.id,
      { avatar: response.url },
      { userFindModify: false }
    );
    res.status(200).json({
      msg: "usuario actualizado",
      response,
    });
    // res.sendFile(path.join(__dirname,'../files/' + req.file.filename))
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listCompanies,
  uploadAvatar,
};
