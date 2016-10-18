var model = require('../models');
var Task = null;

module.exports = {

  getAllTask :function(cb){
    model.Task.find({status:1}, function(err, Tasks){
      if(!err){
        cb(Tasks);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllTasksBySearchValue
  getAllTasksBySearchValue :function(searchValue,limit,page,classRoom,subject,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Task.count({name:new RegExp(searchValue, 'i'),classRoom:classRoom,subject:subject},function(err, count){
      model.Task.find({name:new RegExp(searchValue, 'i'),classRoom:classRoom,subject:subject}).limit(limit).skip(page*limit).exec(function(err,Tasks){
        if(!err){
          cb({result:Tasks,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllTasksCount
  getAllTaskCount :function(limit,page,classRoom,subject,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Task.count({classRoom:classRoom,subject:subject},function(err, count){
      model.Task.find({classRoom:classRoom,subject:subject}).limit(limit).skip(page*limit).exec(function(err,Tasks){
        if(!err){
          cb({result:Tasks,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getTaskId :function(id,cb){
    model.Task.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addTask : function(body,cb){
    var obj =body;
    obj.date = new Date();
    Task = new model.Task(obj);
    Task.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateTask : function(id,body,cb){
    var obj = body;
    model.Task.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteTask : function(id,cb){
    model.Task.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }

};
