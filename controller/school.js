
var model = require("../models");
var jsonfile = require('jsonfile');
var file = './school.json';

module.exports = {
  getSchoolInfo :function(cb){  
  jsonfile.readFile(file, function(err, obj) {
    if(obj){
      cb(obj);
    }else{
      cb(null);
    }
    
  });
  },

  updateSchool : function(body,cb){
    jsonfile.writeFile(file, body, function (err) {
      if(!err){
        cb(true);
      }else{
        cb(false);
      }
    });
  }
};