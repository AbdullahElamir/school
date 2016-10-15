var model = require("../models");
var school=null;

module.exports = {
  getSchoolInfo :function(id,cb){
    model.School.findOne({_id : id}, function(err, school){
      if(!err){
        cb(school);
      }else{
        console.log(err);
        // cb(null);
      }
    });
  },
  getAllSchool :function(cb){
    model.School.find({status : 1}, function(err, school){
      if(!err){
        cb(school);
      }else{
        cb(null);
      }
    });
  },
  updateSchool : function(id,body,cb){
    var obj = body;
    model.School.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  addSchool : function(body,cb){
    var obj =body;
    school = new model.School(obj);
    school.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  }
};