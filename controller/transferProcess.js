var model = require("../models");
var transferProcess = null;

module.exports = {
  
  //getAllStudentsBySearchValue
  "getTransferProcessesBySearchValueAndYear" :function(searchValue,year,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    if( year != "all" ){
      model.TransferProcess.count({path:new RegExp(searchValue, 'i'),year:year})
        .populate('bus')
        .populate('supervisor')
        .populate('driver')
        .exec(function(err,count){
          model.TransferProcess.find({path:new RegExp(searchValue, 'i'),year:year})
          .limit(limit)
          .skip(page*limit)
          .populate('bus')
          .populate('supervisor')
          .populate('driver')
          .exec(function(err,tps){
            if(!err){
              cb({result:tps,count:count});
            }else{
              console.log(err);
              cb(null);
            }
          });
        });
    } else {
      model.TransferProcess.count({path:new RegExp(searchValue, 'i')})
        .populate('bus')
        .populate('supervisor')
        .populate('driver')
        .exec(function(err,count){
          model.TransferProcess.find({path:new RegExp(searchValue, 'i')})
          .limit(limit)
          .skip(page*limit)
          .populate('bus')
          .populate('supervisor')
          .populate('driver')
          .exec(function(err,tps){
            if(!err){
              cb({result:tps,count:count});
            }else{
              console.log(err);
              cb(null);
            }
          });
        });
    }
  } , 

  "addTransferProcess" : function(tpo,cb){
    model.Year.findOne({active : 1}, function(err, custom){
      if(!err && custom != null ){
        var obj = tpo;
        obj.supervisor = tpo.supervisor._id;
        obj.bus = tpo.bus._id;
        obj.driver = tpo.driver._id;
        obj.year = custom._id;
        transferProcess = new model.TransferProcess(obj);
        transferProcess.save(function(err,result){
          if (!err) {
            cb({status : 1});
          } else {
            console.log(err);
            cb({status : 2});
          }
        });
      }else{
        console.log(err);
        cb({status : 3});
      }
    });
  },
 
  "editTransferProcess" : function(id,tpo,cb){
    model.TransferProcess.findOneAndUpdate({_id:id}, tpo, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
   
  "getTransferProcess":function(id,cb){
    model.TransferProcess.findOne({_id:id})
    .populate('bus')
    .populate('supervisor')
    .populate('driver')
    .exec(function(err,tp){
      if(!err){
        cb(tp);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  "getTransferProcessStudents" : function(id,cb){
    model.transferProcessStudents
    .find({transferProcess:id})
    .populate('student')
    .exec(function(err,tpss){
      if(!err){
        if( tpss.length == 0 ){
          cb([]);
          return;
        }
        var tpss1 = JSON.parse(JSON.stringify(tpss));
        var array = [];
        for(var i in tpss1){
          array.push(tpss1[i].student);
          array[i].amount = tpss1[i].amount;
          if( i == (tpss1.length-1) ){
            cb(array);
            return;
          }
        }
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  "updateStudents" : function(id,tpss,cb){
    model.transferProcessStudents.remove({transferProcess:id}, function(err,result) {
      if (!err) {
        if( tpss.length == 0 ){
          cb({status : 1});
          return;
        }
        var counter = 0;
        for(var i in tpss){
          var obj = {
            student : tpss[i]._id,
            amount : tpss[i].amount,
            transferProcess : id
          };
          var transferProcessStudents = new model.transferProcessStudents(obj);
          transferProcessStudents.save(function(err,result){
            if (!err) {
              counter++;
              if( counter == tpss.length ){
                cb({status : 1});
              }
            } else {
              console.log(err);
              cb({status : 2});
            }
          });
        }
      } else {
        console.log(err);
        cb({status : 2});
      }
    });
  },
  
  "deleteTransferProcess" : function(id,cb){
    model.transferProcessStudents.remove({transferProcess:id}, function(err,result) {
      if (!err) {
         model.transferProcessTeachers.remove({transferProcess:id}, function(err,result) {
          if (!err) {
            model.TransferProcess.remove({_id:id}, function(err,result) {
              if (!err) {
                cb(2);
              } else {
                console.log(err);
                cb(3);
              }
            });
          } else {
            console.log(err);
            cb(3);
          }
        });
      } else {
        console.log(err);
        cb(3);
      }
    });
  },
  
  "getTransferProcessTeachers" : function(id,cb){
    model.transferProcessTeachers
    .find({transferProcess:id})
    .populate('teacher')
    .exec(function(err,tpss){
      if(!err){
        if( tpss.length == 0 ){
          cb([]);
          return;
        }
        var tpss1 = JSON.parse(JSON.stringify(tpss));
        var array = [];
        for(var i in tpss1){
          array.push(tpss1[i].teacher);
          array[i].amount = tpss1[i].amount;
          if( i == (tpss1.length-1) ){
            cb(array);
            return;
          }
        }
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  "updateTeachers" : function(id,tpss,cb){
    model.transferProcessTeachers.remove({transferProcess:id}, function(err,result) {
      if (!err) {
        if( tpss.length == 0 ){
          cb({status : 1});
          return;
        }
        var counter = 0;
        for(var i in tpss){
          var obj = {
            teacher : tpss[i]._id,
            amount : tpss[i].amount,
            transferProcess : id
          };
          var transferProcessTeachers = new model.transferProcessTeachers(obj);
          transferProcessTeachers.save(function(err,result){
            if (!err) {
              counter++;
              if( counter == tpss.length ){
                cb({status : 1});
              }
            } else {
              console.log(err);
              cb({status : 2});
            }
          });
        }
      } else {
        console.log(err);
        cb({status : 2});
      }
    });
  }

};