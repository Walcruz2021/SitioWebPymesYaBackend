const express = require("express");
const router = express.Router();


const Company = require("../models/company");
const Category = require("../models/category");
const  companyController=require("../controllers/companyControllers")

const res = require("express/lib/response");
const mongoose = require("mongoose");
const { findById } = require("../models/company");
const { restart } = require("nodemon");

const {
  listCompanies,
  uploadAvatar
}=companyController
const upload = require('../middlewares/uploadAvatar')

router.get("/listCompanies", listCompanies);
router.put("/uploadAvatar/:id",upload.single('avatar'),uploadAvatar);

router.put("/editCompany/:id", async (req, res) => {
  const { nameCompany, identifier, phone, address,notesComp, Category,country,cityName,status,siteWeb} = req.body;
  const newComp = {
    nameCompany,
    identifier,
    phone,
    address,
    notesComp,
    Category,
    country,
    cityName,
    status,
    siteWeb
  };
  await Company.findByIdAndUpdate(req.params.id, newComp, {
    userFindAndModify: false,
  });
  res.json({
    status: "company actualizada",
  });
});


router.post("/addCompany", async (req, res, next) => {
  const {
    nameCompany,
    identifier,
    phone,
    address,
    notesComp,
    Category,
    //president,
    country,
    cityName,
    status,
  } = req.body;
  const company = new Company({
    nameCompany,
    identifier,
    phone,
    address,
    notesComp,
    Category,
    //president,
    country,
    cityName,
    status,
  });
  await company.save();
  res.json({
    status: "created company",
  });
});

router.get("/listCategories", async (req, res, next) => {
  const listCategories = await Category.find();
  try {
    if (listCategories.length > 0) {
      res.status(200).json({
        listCategories,
      });
    } else {
      res.status(204).json({
        msg: "there are no categories",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/listCompaniesByCategory/:idCategory", async (req, res) => {
  const idCategory = req.params.idCategory;
  const listCompanies = await Company.find({ Category: idCategory });
  try {
    if (listCompanies.length > 0) {
      res.status(200).json({
        listCompanies,
      });
    } else {
      res.status(204).json({
        msg: "there are no companies",
      });
    }
  } catch {
    console.log(err);
  }
});

router.get("/listCompaniesByLevel", async (req, res) => {
  const level = 3;
  const listCompanies = await Company.find({ level: level });
  try {
    if (listCompanies.length > 0) {
      res.status(200).json({
        listCompanies,
      });
    } else {
      res.status(204).json({
        msg: "there are no companies",
      });
    }
  } catch {
    console.log(err);
  }
});

router.get("/detailsCompany/:id", async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const search = await Company.findById(req.params.id);
    try {
      if (search) {
        res.status(200).json({
          search
        });
      } else {
        res.status(204).json({
          msg: "element not searched",
        });
      }
    } catch (err) {
      console.log(error);
    }
  }
});

module.exports = router;
