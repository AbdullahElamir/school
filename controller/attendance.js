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
  getAttendanceDate :function(date,stupro,cb){
    var d1 = new Date(date);
    var d2 = new Date(date);
    d1.setHours(0);
    // d1.setMilliseconds(0);
    d1.setMinutes(0);
    d1.setSeconds(0);
    d2.setHours(23);
    // d2.setMilliseconds(999);
    d2.setMinutes(59);
    d2.setSeconds(59);
    model.Attendance.find({$and:[{StuPro:{$in:stupro}},{date:{$lte: new Date(d2)}},{date:{$gte: new Date(d1)}}]}).populate('StuPro').exec(function(err, Attendancees){
      if(!err){
        var att=[];
        if(Attendancees.length==0){
          cb(att);
        }
        for(j in Attendancees){
          att[Attendancees[j].StuPro.id]={attend:Attendancees[j].attend,reson:Attendancees[j].reason};
          if(j == Attendancees.length-1){
            cb(att);
          }
        }
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  setAttendance : function(stupro,attend,date,cb){
    var d1 = new Date(date);
    var d2 = new Date(date);
    d1.setHours(0);
    d1.setMinutes(0);
    d1.setSeconds(0);
    d2.setHours(23);
    // d2.setMilliseconds(999);
    d2.setMinutes(59);
    d2.setSeconds(59);
    model.Attendance.findOneAndUpdate({$and:[{StuPro:stupro},{date:{$lte: new Date(d2)}},{date:{$gte: new Date(d1)}}]}, {attend:attend}, function(err,result) {
      if (!err) {
        if(result){
          cb(true);
        }else{
          var obj ={
            StuPro:stupro,
            date:new Date(date),
            attend:attend
          };
          Attendance1 = new model.Attendance(obj);
          Attendance1.save(function(err,result){
            if (!err) {
              cb(true);
            } else {
              console.log(err);
              cb(false);
            }
          });
        }

      } else {
        console.log(err);
        cb(false);
      }
    });

  },
  setReason : function (id,reason,date,cb){
    console.log(reason);
    model.Attendance.findOneAndUpdate({_id:id,date:date}, {reason:reason.reason}, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  }
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
