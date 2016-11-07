var model = require('../models');
var Other = null;

module.exports = {

  getAllOther :function(school,cb){
    model.Other.find({school:school,status:1}, function(err, Others){
      if(!err){
        cb(Others);
      }else{
        cb(null);
      }
    });
  },
  getAllOtherStudent :function(id,cb){
    model.StdOther.find({status:1,student:id}).populate("other").exec(function(err, Others){
      if(!err){
        cb(Others);
      }else{
        cb(null);
      }
    });
  },
  setStudentOther :function(StdOther,cb){
    var stdO = new model.StdOther(StdOther);
    stdO.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  //getAllOthersBySearchValue
  getAllOthersBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Other.count({school:school,name:new RegExp(searchValue, 'i')},function(err, count){
      model.Other.find({school:school,name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Others){
        if(!err){
          cb({result:Others,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllOthersCount
  getAllOtherCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Other.count({school:school},function(err, count){
      model.Other.find({school:school}).limit(limit).skip(page*limit).exec(function(err,Others){
        if(!err){
          cb({result:Others,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getOtherId :function(id,cb){
    model.Other.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addOther : function(body,cb){
    var obj =body;
    obj.date = new Date();
    Other = new model.Other(obj);
    Other.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  updateOther : function(id,body,cb){
    var obj = body;
    model.Other.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },
  updateStudentOther : function(id,body,cb){
    var obj = body;
    model.StdOther.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  deleteOther : function(id,cb){
    model.Other.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  },

  deleteStudentOther : function(id,cb){
    model.StdOther.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  }

};
