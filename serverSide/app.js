var express = require('express');
var app = express();
var multer  = require('multer');
var bodyParser = require('body-parser');

/************** WE ARE USING SAME EXPRESS SERVER FOR BOTH client and server ************/
app.use(express.static('../clientSide'));
app.use(bodyParser.json());



/**************  FILE UPLOAD PACKAGE FOR NODEJS *******************************/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename : function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });


/************** API URL TO UPLOAD THE FILE *************************************/
app.post('/upload', upload.any(), function(req,res){
  var data = req.files;
  console.log(data);
  console.log("At server side");
  res.json({file : data, error : false});
});



/*************** PORT & SERVER INITIALIZATION **********************************/
app.listen('3000', function(){
    console.log('Server is running on 3000...');
});

module.exports = app;
