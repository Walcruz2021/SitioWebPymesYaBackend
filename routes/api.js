const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const Service = require("../models/service");
const Category = require("../models/category");
const ActiveIngred = require("../models/activeingredient");
const companyController = require("../controllers/companyControllers");
const noteController = require("../controllers/noteControllers");
const userServiceController = require("../controllers/userServiceControllers");
const categoryController = require("../controllers/categoryControllers");
const serviceController = require("../controllers/serviceControllers");
const res = require("express/lib/response");
const Note = require("../models/note");
const mongoose = require("mongoose");
const multer = require("multer");
const xl = require("excel4node");
const exceljs = require("exceljs");
const path = require("path");

//const list = require("../JSON/ListActiveIng.json");
const { listCompanies, uploadAvatar,newCompany,getCompanyByUser} = companyController;
const { uploadAvatarNote } = noteController;
const {listCategories} = categoryController
const {newUserService} = userServiceController
const {addService,editService,deleteService}=serviceController

const upload = require("../middlewares/uploadAvatar");

router.get("/listCompanies", listCompanies);

router.get("/getCompanyByUser", getCompanyByUser);

router.put("/uploadAvatar/:id", upload.single("avatar"), uploadAvatar);
//router.post("/addNote",upload.single("avatar"), uploadAvatarNote)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directorio donde se guardará la imagen
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre del archivo en el servidor
  },
});

const upload1 = multer({ storage: storage });

router.get("/deleteService/:id",deleteService)

router.put("/editCompany/:id", async (req, res) => {
  const {
    nameCompany,
    identifier,
    phone,
    address,
    notesComp,
    Category,
    country,
    cityName,
    status,
    siteWeb,
  } = req.body;
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
    siteWeb,
  };
  await Company.findByIdAndUpdate(req.params.id, newComp, {
    userFindAndModify: false,
  });
  res.json({
    status: "company actualizada",
  });
});

router.post("/addCompany", newCompany);
router.post("/addUserService", newUserService);
router.post("/addService", addService);

router.get("/listCategories", listCategories);

router.post("/addCategory", async (req, res, next) => {
  const { name, typeName, logo } = req.body;
  const category = new Category({
    name,
    typeName,
    logo,
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
  const level = 3; //level vip
  const levelPay = true; //si pagaron
  const typeComp = 1; //typo compañia
  // const listCompanies = await Company.find({ level: level,typeComp:elemTypeComp});
  const listCompanies = await Company.find({
    level: level,
    levelPay: levelPay,
    typeComp: typeComp,
  });
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
  const level = 3; //level vip
  const levelPay = true; //si pagaron
  const typeComp = 3; //porfesional que ofrece su servicio
  // const listCompanies = await Company.find({ level: level,typeComp:elemTypeComp});
  const listCompanies = await Company.find({
    level: level,
    levelPay: levelPay,
    typeComp: typeComp,
  });
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
router.get("/listEmpleosByLevel", async (req, res) => {
  const level = 3; //level vip
  const levelPay = true; //si pagaron
  const typeComp = 2; //empleo que una empresa otorga
  // const listCompanies = await Company.find({ level: level,typeComp:elemTypeComp});
  const listCompanies = await Company.find({
    level: level,
    levelPay: levelPay,
    typeComp: typeComp,
  });
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

router.get("/listEmpleos", async (req, res, next) => {
  const listEmpleos = await Company.find({ typeComp: 2 });
  try {
    if (listEmpleos.length > 0) {
      res.status(200).json({
        listEmpleos,
      });
    } else {
      res.status(204).json({
        msg: "there are no empleos",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/detailsCompany/:id", async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const search = await Company.findById(req.params.id);
    try {
      if (search) {
        res.status(200).json({
          search,
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

router.post("/addNote", async (req, res) => {
  try {
    const objectNote = req.body;
    console.log(objectNote);
    // Utiliza el método reduce para construir el objeto newNote
    const newNote = Object.keys(objectNote).reduce((acc, campo) => {
      acc[campo] = objectNote[campo];
      return acc;
    }, {});

    console.log(newNote, "foreach");

    const note = new Note(newNote);
    //console.log(note);
    await note.save();

    res.json({
      status: "created note",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/getNotes", async (req, res) => {
  const listNotes = await Note.find();
  try {
    if (listNotes.length) {
      res.status(200).json({
        listNotes,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

//router.get("/verificationAddService/:userCompany", async (req, res) => {
router.get("/verificationAddService/:emailCompany", async (req, res) => {
  const { emailCompany } = req.params;
  console.log(emailCompany);
  const search = await Service.find({ email:emailCompany });
  const count = search.length;

  if (count === 1) {
    res.status(200).json({
      msg: "add service one allowed",
      search,
    });
  } else if (count == 2) {
    res.status(201).json({
      msg: "add service not allowed",
      search,
    });
  } else if (count === 0) {
    res.status(205).json({
      msg: "add all service allowed",
    });
  }
});

router.put("/editService/:idService", editService);

// router.post("/addNote", async (req, res) => {
//   try {
//     const objectNote = req.body;
//     console.log(objectNote)
//     const note = new Note(objectNote);
//     console.log(note)
//     await note.save();

//     res.json({
//       status: "created note",
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// router.get("/listActivIngre", async (req, res) => {
//   const objeto = {
//     idSupply: "",
//     arrayActivities: [],
//   };

// const array=[]
// // ActiveIngred.find({_id: "60b6addf2e6a511f1551e36d"}, {name: 1}, function(err, result) {
// //   if (err) throw err;
// //   console.log(result);
// // });
//   for (let i = 0; i < list.length>0; i++){
//     //console.log(list[i])
//     const find = await ActiveIngred.find({_id:list[i].idActive});

//   if(find){
//     array.push(find[0])
//   }else{
//     console.log("no se encuentra el" + list[i].idActive)
//   }
//   }

//   if (array.length > 0) {

//     let wb = new xl.Workbook();

//     let ws = wb.addWorksheet("Worksheet");

//     var green = wb.createStyle({
//       font: {
//         color: "#388813",
//         size: 12,
//       },
//     });

//     ws.cell(1, 1).string("idSupply").style(green);
//     //ws.cell(1, 2).string("arrayActivities").style(green);
//     for (let i = 1; i < array.length>0; i++) {
//       //console.log(array.name.es)

//         ws.cell(i+2, 1).string(`${array[i].name.es}`).style(green);

//       //ws.cell(i+2, 2).string(`${arrayObject[i].arrayActivities}`).style(green);
//     }
//     ws.column(1).setWidth(30);
//     ws.column(2).setWidth(30);
//     ws.column(3).setWidth(30);
//     ws.column(4).setWidth(30);

//     const pathExcel = path.join(__dirname, "excel", "Ventas.xlsx");
//     wb.write(pathExcel, function (err, stats) {
//       if (err) {
//         console.log(err);
//       } else {
//         function downloadFile() {
//           res.download(pathExcel);
//         }
//         downloadFile();
//         return false;
//       }
//     });
//     res.status(200).json({
//       array: array,
//     });
//   } else {
//     res.status(204).json({
//       msg: "no hay elementos",
//     });
//   }

// });

module.exports = router;
