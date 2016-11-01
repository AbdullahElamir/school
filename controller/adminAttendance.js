var model = require('../models');

module.exports = {

  getAllAttend :function(cb){
    model.AdminAttendance.find({status:1}).populate('Admin')
    .exec( function(err, AdminAttendancees){
      if(!err){
        cb(AdminAttendancees);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },



  //getAllCustomerCount
  getAllAdminAttendanceCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.AdminAttendance.count({status:1},function(err, count){
      model.AdminAttendance.find({status:1}).populate('StuPro').limit(limit).skip(page*limit).exec(function(err,AdminAttendancees){
        if(!err){
          cb({result:AdminAttendancees,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllAdminAttendanceStatus:function(status,cb){
    model.AdminAttendance.find({status:status}).populate('StuPro').exec(function(err, AdminAttendancees){
      if(!err){
        cb(AdminAttendancees);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },



  getAdminAttendanceId :function(id,cb){
    model.AdminAttendance.findOne({_id : id,status:1}, function(err, AdminAttendancees){
      if(!err){
        cb(AdminAttendancees);
      }else{
        cb(null);
      }
    });
  },

  addAdminAttendance : function(body,cb){
    var obj =body;
    var AdminAttendance1 = new model.AdminAttendance(obj);
    AdminAttendance1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateAdminAttendance : function(id,body,cb){
    var obj = body;
    model.AdminAttendance.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getAdminAttendanceDate :function(date,admin,cb){
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
    model.AdminAttendance.find({$and:[{admin:{$in:admin}},{date:{$lte: new Date(d2)}},{date:{$gte: new Date(d1)}}]}).populate('Admin').exec(function(err, AdminAttendancees){
      if(!err){
        var att=[];
        if(AdminAttendancees.length==0){
          cb(att);
        }
        for(var j in AdminAttendancees){
          att[AdminAttendancees[j].admin]={attend:AdminAttendancees[j].attend,reson:AdminAttendancees[j].reason};
          if(j == AdminAttendancees.length-1){
            cb(att);
          }
        }
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  setAdminAttendance : function(id,attend,date,cb){
    var d1 = new Date(date);
    var d2 = new Date(date);
    d1.setHours(0);
    d1.setMinutes(0);
    d1.setSeconds(0);
    d2.setHours(23);
    // d2.setMilliseconds(999);
    d2.setMinutes(59);
    d2.setSeconds(59);
    model.AdminAttendance.findOneAndUpdate({$and:[{admin:id},{date:{$lte: new Date(d2)}},{date:{$gte: new Date(d1)}}]}, {attend:attend}, function(err,result) {
      if (!err) {
        if(result){
          cb(true);
        }else{
          var obj ={
            admin:id,
            date:new Date(date),
            attend:attend
          };
          var AdminAttendance1 = new model.AdminAttendance(obj);
          AdminAttendance1.save(function(err){
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
    model.AdminAttendance.findOneAndUpdate({$and:[{admin:id},{date:{$lte: new Date(d2)}},{date:{$gte: new Date(d1)}}]}, {reason:reason.reason}, function(err,result) {
      if (!err) {
        if(result){
          cb(true);
        } else {
          var obj = {"admin":id,"date":new Date(date),"attend":0,"reason":reason.reason};
          var AdminAttendance = new model.AdminAttendance(obj);
          AdminAttendance.save(function(err){
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
  // deleteAdminAttendance : function(id,cb){
  //   model.AdminAttendance.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }

};
