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

exports.inFile = inFile
exports.upload = multer({
    dest:"files",
    fileFilter
});