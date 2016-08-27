var model = require('../models');
var Attendance1 = null;

module.exports = {

  getAllAttend :function(cb){
    model.Attendance.find({status:1}).populate('StuPro')
    .exec( function(err, Attendancees){
      if(!err){
        cb(Attendancees);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  


  //getAllCustomerCount
  getAllAttendanceCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Attendance.count({status:1},function(err, count){
      model.Attendance.find({status:1}).populate('StuPro').limit(limit).skip(page*limit).exec(function(err,Attendancees){
        if(!err){
          cb({result:Attendancees,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllAttendanceStatus:function(status,cb){
    model.Attendance.find({status:status}).populate('StuPro').exec(function(err, Attendancees){
      if(!err){
        cb(Attendancees);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  


  getAttendanceId :function(id,cb){
    model.Attendance.findOne({_id : id,status:1}, function(err, Attendancees){
      if(!err){
        cb(Attendancees);
      }else{
        cb(null);
      }
    });
  },

  addAttendance : function(body,cb){
    var obj =body;
    Attendance1 = new model.Attendance(obj);
    Attendance1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateAttendance : function(id,body,cb){
    obj = body;
    model.Attendance.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  // deleteAttendance : function(id,cb){
  //   model.Attendance.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }
  
};