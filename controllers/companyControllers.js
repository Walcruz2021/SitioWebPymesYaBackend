const Company = require("../models/company");
const imgbbUploader = require('imgbb-uploader')
let path = require('path')
let fs = require('fs')

const listCompanies = async (req, res) => {
  try {
    const listCompanies = await Company.find();
    if (listCompanies.length > 0) {
      console.log(listCompanies)
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

// EL APIKEY SE LO SACA DE LA PAGINA https://api.imgbb.com/
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

const newCompany=async (req, res, next) => {
  const {
    nameCompany,
    userCompany,
    identifier,
    phone,
    phone2,
    address,
    notesComp,
    Category,
    country,
    //typeCategory,
    //president,
    cityName,
    level,
    levelPay,
    status,
    siteWeb,
    email,
    typeComp,
    codeInter,
    branchOffice,
  } = req.body;
  console.log(nameCompany);
  const company = new Company({
    nameCompany,
    userCompany,
    identifier,
    phone,
    phone2,
    address,
    notesComp,
    Category,
    country,
    cityName,
    level,
    levelPay,
    status,
    siteWeb,
    email,
    typeComp,
    codeInter,
    branchOffice,
  });
  console.log(company.typeComp);
  await company.save();
  res.json({
    status: "created company",
  });
}

module.exports = {
  listCompanies,
  uploadAvatar,
  newCompany
};
