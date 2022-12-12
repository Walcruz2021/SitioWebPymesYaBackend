const multer = require('multer');
const path = require('path');
const imgbbUploader=require("imgbb-uploader")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../files/'));
        //cb(null, '../files/');
    },
 
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
        //cb(null, file.originalname + '-' + Date.now())
    }
})

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        req.fileValidationError = "Sólo imágenes (.jpg, .jpeg, .png, .gif)";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}


const uploadFile = multer({storage, fileFilter});

module.exports = uploadFile;