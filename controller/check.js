var model = require('../models');
var Check = null;

module.exports = {

  getAllCheck :function(school,cb){
    model.Check.find({school:school,status:1}, function(err, Checks){
      if(!err){
        cb(Checks);
      }else{
        cb(null);
      }
    });
  },
  getAllCheckStudent :function(id,cb){
    model.StdCheck.find({status:1,student:id}).populate("check").exec(function(err, Checks){
      if(!err){
        cb(Checks);
      }else{
        cb(null);
      }
    });
  },
  setStudentCheck :function(StdCheck,cb){

    var stdCk = new model.StdCheck(StdCheck);
    stdCk.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  //getAllChecksBySearchValue
  getAllChecksBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Check.count({school:school,name:new RegExp(searchValue, 'i')},function(err, count){
      model.Check.find({school:school,name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Checks){
        if(!err){
          cb({result:Checks,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllChecksCount
  getAllCheckCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Check.count({school:school},function(err, count){
      model.Check.find({school:school}).limit(limit).skip(page*limit).exec(function(err,Checks){
        if(!err){
          cb({result:Checks,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getCheckId :function(id,cb){
    model.Check.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addCheck : function(body,cb){
    var obj =body;
    obj.date = new Date();
    Check = new model.Check(obj);
    Check.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  updateCheck : function(id,body,cb){
    var obj = body;
    model.Check.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },
  updateStudentCheck : function(id,body,cb){
    var obj = body;
    model.StdCheck.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  deleteCheck : function(id,cb){
    model.Check.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  },

  deleteStudentCheck : function(id,cb){
    model.StdCheck.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  }

};
