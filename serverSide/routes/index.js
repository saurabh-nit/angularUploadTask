var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename : function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

router.post('/upload',upload.any(),function(req,res){
  var nr = req.files;
  console.log(nr);
  console.log("At server side");
  res.json({file : nr, error : false});
});

module.exports = router;
