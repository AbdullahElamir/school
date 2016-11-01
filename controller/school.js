var model = require("../models");
var school=null;

module.exports = {

  getSchoolsBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.School.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.School.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Schools){
        if(!err){
          cb({result:Schools,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllSchoolsCount
  getAllSchoolCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.School.count({},function(err, count){
      model.School.find({}).limit(limit).skip(page*limit).exec(function(err,Schools){
        if(!err){
          cb({result:Schools,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getSchoolInfo :function(id,cb){
    model.School.findOne({_id : id}, function(err, school){
      if(!err){
        cb(school);
      }else{
        //console.log(err);
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
    model.School.findOneAndUpdate({_id:id}, obj, function(err) {
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
    school.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  deleteSchool : function(id,cb){
    model.School.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }

};
