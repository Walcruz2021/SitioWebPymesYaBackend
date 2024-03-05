const Service = require("../models/service");

const addService = async (req, res, next) => {
  const {
    fullName,
    nameCompany,
    phone,
    phone2,
    address,
    Category,
    country,
    cityName,
    status,
    email,
    noteService,
  } = req.body;

  const newService = new Service({
    fullName,
    nameCompany,
    phone,
    phone2,
    address,
    Category,
    country,
    cityName,
    status,
    email,
    noteService,
  });

  console.log(fullName);
  await newService.save();
  res.json({
    status: "created Service",
  });
};

const editService = async (req, res) => {
  const idService = req.params.idService;
  //console.log(idCompany)
  const {
    fullName,
    nameCompany,
    phone,
    phone2,
    address,
    Category,
    country,
    cityName,
    email,
    noteService,
  } = req.body;
  const newServ = {
    fullName,
    nameCompany,
    phone,
    phone2,
    address,
    Category,
    country,
    cityName,
    email,
    noteService,
  };

  await Service.findByIdAndUpdate(idService, newServ, {
    userFindAndModify: true,
  });

  res.status(200).json({
    msg: "updated service",
  });
};

module.exports = {
  addService,
  editService,
};
