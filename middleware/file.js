const multer  = require("multer");
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
    file.mimetype === "application/vnd.ms-excel"){
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
let dest = process.env.dirname+"/files/"
exports.upload = multer({
    dest
});
