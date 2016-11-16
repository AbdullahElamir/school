var model = require('../models');
var ClassRoom1 = null;

module.exports = {

  getAllClassRoom :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school;
    }
    model.ClassRoom.find(q).populate('room')
    .exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllClassRoomesBySearchValue
  getAllClassRoomesBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1,
      name:new RegExp(searchValue, 'i')
    };
    if(school!= -1){
      q.school=school
    }
    model.ClassRoom.count(q).populate('room').exec(function(err, count){
      model.ClassRoom.find(q).populate('room').limit(limit).skip(page*limit).exec(function(err,ClassRoomes){
        if(!err){
          cb({result:ClassRoomes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllClassRoomCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.ClassRoom.count(q,function(err, count){
      model.ClassRoom.find(q).populate('room').limit(limit).skip(page*limit).exec(function(err,ClassRoomes){
        if(!err){
          cb({result:ClassRoomes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllClassRoomStatus:function(status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.ClassRoom.find(q).populate('room').exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getClassRoomName :function(name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.ClassRoom.find(q).populate('room').limit(30).exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        cb(null);
      }
    });
  },

  getClassRoomId :function(id,cb){
    model.ClassRoom.findOne({_id : id}).populate('room').populate('class').exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        cb(null);
      }
    });
  },
  getClassRoomIdWithYear :function(id,cb){
    model.ClassRoom.findOne({_id : id}).populate('year').exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        cb(null);
      }
    });
  },
  getClassRoomIdWithYearAndSystem :function(id,cb){
    model.ClassRoom.findOne({_id : id})
    .populate({path: 'year',populate: { path: 'system' , populate : {path : 'sys_class.selected.id_subject'}}})
    .exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        cb(null);
      }
    });
  },

  addClassRoom : function(body,cb){
    var obj =body;
    ClassRoom1 = new model.ClassRoom(obj);
    ClassRoom1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateClassRoom : function(id,body,cb){
    var obj = body;
    model.ClassRoom.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getAllClassesAndClassRoomsByYear : function(school,year,cb){
    model.ClassRoom.find({year:year}).populate('class')
    .exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
//        console.log(err);
        cb(null);
      }
    });
  },
  getClassRoomClass : function(clas,cb){
    model.ClassRoom.find({class:clas}).distinct('_id',function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  }
  // deleteClassRoom : function(id,cb){
  //   model.Study.find({customer:id}, function(err,resul) {
  //     if(resul.length > 0){
  //       cb(1);
  //     } else{
  //       model.ClassRoom.remove({_id:id}, function(err,result) {
  //         if (!err) {
  //           cb(2);
  //         } else {
  //           console.log(err);
  //           cb(3);
  //         }
  //       });
  //     }
  //   });
  // }

};
