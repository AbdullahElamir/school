var model = require('../models');
var teacherTeacherAttendance = null;

module.exports = {

  getAllAttend :function(cb){
    model.TeacherAttendance.find({status:1}).populate('Teacher')
    .exec( function(err, TeacherAttendancees){
      if(!err){
        cb(TeacherAttendancees);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },



  //getAllCustomerCount
  getAllTeacherAttendanceCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.TeacherAttendance.count({status:1},function(err, count){
      model.TeacherAttendance.find({status:1}).populate('StuPro').limit(limit).skip(page*limit).exec(function(err,TeacherAttendancees){
        if(!err){
          cb({result:TeacherAttendancees,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllTeacherAttendanceStatus:function(status,cb){
    model.TeacherAttendance.find({status:status}).populate('StuPro').exec(function(err, TeacherAttendancees){
      if(!err){
        cb(TeacherAttendancees);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },



  getTeacherAttendanceId :function(id,cb){
    model.TeacherAttendance.findOne({_id : id,status:1}, function(err, TeacherAttendancees){
      if(!err){
        cb(TeacherAttendancees);
      }else{
        cb(null);
      }
    });
  },

  addTeacherAttendance : function(body,cb){
    var obj =body;
    TeacherAttendance1 = new model.TeacherAttendance(obj);
    TeacherAttendance1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateTeacherAttendance : function(id,body,cb){
    var obj = body;
    model.TeacherAttendance.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getTeacherAttendanceDate :function(date,teacher,cb){
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
    model.TeacherAttendance.find({$and:[{teacher:{$in:teacher}},{date:{$lte: new Date(d2)}},{date:{$gte: new Date(d1)}}]}).populate('Teacher').exec(function(err, TeacherAttendancees){
      if(!err){
        var att=[];
        if(TeacherAttendancees.length==0){
          cb(att);
        }
        for(var j in TeacherAttendancees){
          att[TeacherAttendancees[j].teacher]={attend:TeacherAttendancees[j].attend,reson:TeacherAttendancees[j].reason};
          if(j == TeacherAttendancees.length-1){
            cb(att);
          }
        }
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  setTeacherAttendance : function(id,attend,date,cb){
    var d1 = new Date(date);
    var d2 = new Date(date);
    d1.setHours(0);
    d1.setMinutes(0);
    d1.setSeconds(0);
    d2.setHours(23);
    // d2.setMilliseconds(999);
    d2.setMinutes(59);
    d2.setSeconds(59);
    model.TeacherAttendance.findOneAndUpdate({$and:[{teacher:id},{date:{$lte: new Date(d2)}},{date:{$gte: new Date(d1)}}]}, {attend:attend}, function(err,result) {
      if (!err) {
        if(result){
          cb(true);
        }else{
          var obj ={
            teacher:id,
            date:new Date(date),
            attend:attend
          };
          TeacherAttendance1 = new model.TeacherAttendance(obj);
          TeacherAttendance1.save(function(err,result){
            if (!err) {
              cb(true);
            } else {
              // console.log(err);
              cb(false);
            }
          });
        }

      } else {
        // console.log(err);
        cb(false);
      }
    });

  },
  setReason : function (id,reason,date,cb){

    var d1 = new Date(date);
    var d2 = new Date(date);
    d1.setHours(0);
    d1.setMinutes(0);
    d1.setSeconds(0);
    d2.setHours(23);
    // d2.setMilliseconds(999);
    d2.setMinutes(59);
    d2.setSeconds(59);
    model.TeacherAttendance.findOneAndUpdate({$and:[{teacher:id},{date:{$lte: new Date(d2)}},{date:{$gte: new Date(d1)}}]}, {reason:reason.reason}, function(err,result) {
      if (!err) {
        if(result){
          cb(true);
        } else {
          var obj = {"teacher":id,"date":new Date(date),"attend":0,"reason":reason.reason};
          var TeacherAttendance = new model.TeacherAttendance(obj);
          TeacherAttendance.save(function(err,result){
            if (!err) {
              cb(true);
            } else {
              // console.log(err);
              cb(false);
            }
          });
        }
      } else {
        // console.log(err);
        cb(false);
      }
    });
  }
  // deleteTeacherAttendance : function(id,cb){
  //   model.TeacherAttendance.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }

};
