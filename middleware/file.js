const multer  = require("multer");
var IfXls = false
var IfImg = false
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
    file.mimetype === "application/vnd.ms-excel"){
        IfXls = true
        cb(null, true);
    }
    if(file.mimetype === "image/png"|| 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}
exports.upload = multer({
    dest:"files",
    fileFilter
});
