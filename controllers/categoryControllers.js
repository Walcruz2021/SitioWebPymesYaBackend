const Category = require("../models/category");

const listCategories=async (req, res, next) => {
    const listCategories = await Category.find();
    try {
      if (listCategories.length > 0) {
        res.status(200).json({
          listCategories,
        });
      } else {
        res.status(204).json({
           msg: "there are no categories",
          //console.log("not found categories")
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  module.exports={
    listCategories
  }