var model = require("../models");
var transferProcess = null;

module.exports = {
  
  //getAllStudentsBySearchValue
  getTransferProcessesBySearchValueAndYear :function(searchValue,year,limit,page,cb){
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
      if(!err){
        var obj = tpo;
        obj.supervisor = tpo.supervisor._id;
        obj.bus = tpo.bus._id;
        obj.driver = tpo.driver._id;
        obj.year = custom._id;
        transferProcess = new model.TransferProcess(obj);
        transferProcess.save(function(err,result){
          if (!err) {
            cb(true);
          } else {
            console.log(err);
            cb(false);
          }
        });
      }else{
        console.log(err);
        cb(false);
      }
    });
  } ,
 
  "editTransferProcess" : function(id,tpo,cb){
    console.log("Edit Object : ");
    console.log(tpo);
    model.TransferProcess.findOneAndUpdate({_id:id}, tpo, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  } ,
          
  "deleteTransferProcess" : function(id,cb){
    model.TransferProcess.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        console.log(err);
        cb(3);
      }
    });
  }
  
  

};