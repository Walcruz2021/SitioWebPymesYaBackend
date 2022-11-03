const express = require("express");
const router = express.Router();
// const BlogPost = require('../models/blogPost');

const Company = require("../models/company");
const Category = require("../models/category");



const res = require("express/lib/response");
const mongoose = require("mongoose");




router.get("/listCompanies", async (req, res) => {
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
  const level = 2
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


module.exports = router;
