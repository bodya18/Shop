const multer  = require("multer");

var inFile = false

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
    file.mimetype === "application/vnd.ms-excel"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}
const filePhotoFilter = (req, file, cb) => {
    if(file.mimetype === "image/png"|| 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
        inFile = true
    }
    else{
        cb(null, false);
    }
}
exports.inFile = inFile;
exports.photo = multer({
    dest:"files",
    filePhotoFilter
});
exports.upload = multer({
    dest:"files",
    fileFilter
});
