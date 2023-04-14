const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const Category = require("../models/category");
const  companyController=require("../controllers/companyControllers")
const res = require("express/lib/response");
const mongoose = require("mongoose");


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
    typeCategory,
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
    typeCategory,
    //president,
    country,
    cityName,
    status,
    siteWeb
  } = req.body;
  console.log(nameCompany)
  const company = new Company({
    nameCompany,
    identifier,
    phone,
    address,
    notesComp,
    Category,
    typeCategory,
    //president,
    country,
    cityName,
    status,
    siteWeb
  });
  console.log(company)
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

router.post("/addCategory", async (req, res, next) => {
  const {
    name,
    typeName,
    logo
  } = req.body;
  const category = new Category({
    name,
    typeName,
    logo
    
  });
  await category.save();
  res.json({
    status: "category created",
  });
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

//imprimira listado de empresa vip nivel 3 (las que deben aparecer en todas las pestañas)
//dichas empresas por supuesto que tienen que tener activddo en true el campo levelPay (pago)
router.get("/listCompaniesByLevel", async (req, res) => {
  
  const level=3 //level vip
  const levelPay=true //si pagaron
  const typeComp=1 //typo compañia  
  // const listCompanies = await Company.find({ level: level,typeComp:elemTypeComp});
  const listCompanies = await Company.find({ level: level,levelPay:levelPay,typeComp:typeComp});
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

//imprimira listado de empresa vip nivel 3 (las que deben aparecer en todas las pestañas)
//dichas empresas por supuesto que tienen que tener activddo en true el campo levelPay (pago)
router.get("/listProfesionalsByLevel", async (req, res) => {
  const level=3 //level vip
  const levelPay=true //si pagaron
  const typeComp=3 //porfesional que ofrece su servicio 
  // const listCompanies = await Company.find({ level: level,typeComp:elemTypeComp});
  const listCompanies = await Company.find({ level: level,levelPay:levelPay,typeComp:typeComp});
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
