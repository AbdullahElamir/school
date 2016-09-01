var model = require('../models');
var class1 = null;

module.exports = {

  getAllSystem :function(cb){
    model.System.find({}, function(err, classes){
      if(!err){
        cb(classes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  }




};