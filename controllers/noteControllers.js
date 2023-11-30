const Note = require("../models/note");
const imgbbUploader = require("imgbb-uploader");
let path = require("path");
let fs = require("fs");

const uploadAvatarNote = async (req, res, next) => {
  
  try {
    console.log(req.file)
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

    const note = new Note({avatar: response.url},{ userFindModify: false });
    
    await note.save();

    res.status(200).json({
      msg: "note agregada",
      response,
    });
    // res.sendFile(path.join(__dirname,'../files/' + req.file.filename))
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadAvatarNote
};
