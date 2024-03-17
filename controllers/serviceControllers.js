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
    condition,
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
    condition,
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
  console.log(idService)
  const {
    fullName,
    nameCompany,
    phone,
    phone2,
    address,
    Category,
    country,
    cityName,
    condition,
    email,
    noteService
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
    condition
  };
console.log(newServ)
  await Service.findByIdAndUpdate(idService, newServ, {
    userFindAndModify: true,
  });

  res.status(200).json({
    msg: "updated service",
  });
};

const deleteService = async (req, res) => {
  const idService = req.params.id;
  console.log(idService);
  const newCondition = {
    condition: false,
  };
  await Service.findByIdAndUpdate(idService, newCondition, {
    userFindAndModify: false,
  });
  try {
    res.status(200).json({
      msg: "service deleted",
    });
  } catch {
    console.log(error);
  }
};

const verificationAddService = async (req, res) => {
  const { emailCompany } = req.params;
  console.log(emailCompany);
  const search = await Service.find({ email: emailCompany, condition: true });
  const count = search.length;
console.log(count)
  if (count === 1) {
    res.status(200).json({
      msg: "add service one allowed",
      search,
    });
  } else if (count === 2) {
    res.status(201).json({
      msg: "NOT allowed add service",
      search,
    });
  } else if (count === 0) {
    res.status(205).json({
      msg: "add all service allowed",
    });
  }
};

module.exports = {
  addService,
  editService,
  deleteService,
  verificationAddService,
};
