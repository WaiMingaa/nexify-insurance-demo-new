var formrouter = require('express').Router();
var db = require('./../cloudant/cloudant-service');
formrouter.post('/', function (req, res) {
    var form = req.body;
    //console.log(form);
   var response= db.insertdata(form.title, form.list);
   res.send(response);
})
module.exports=formrouter;