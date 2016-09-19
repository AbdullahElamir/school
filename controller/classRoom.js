var model = require('../models');
var ClassRoom1 = null;

module.exports = {

  getAllClassRoom :function(cb){
    model.ClassRoom.find({status:1}).populate('room')
    .exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllClassRoomesBySearchValue
  getAllClassRoomesBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.ClassRoom.count({name:new RegExp(searchValue, 'i')}).populate('room').exec(function(err, count){
      model.ClassRoom.find({name:new RegExp(searchValue, 'i')}).populate('room').limit(limit).skip(page*limit).exec(function(err,ClassRoomes){
        if(!err){
          cb({result:ClassRoomes,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllClassRoomCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.ClassRoom.count({status:1},function(err, count){
      model.ClassRoom.find({status:1}).populate('room').limit(limit).skip(page*limit).exec(function(err,ClassRoomes){
        if(!err){
          cb({result:ClassRoomes,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllClassRoomStatus:function(status,cb){
    model.ClassRoom.find({status:status}).populate('room').exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getClassRoomName :function(name,cb){
    model.ClassRoom.find({$and:[{status:1},{name :{ $regex:name, $options: 'i' }}]}).populate('room').limit(30).exec(function(err, ClassRoomes){
      if(!err){
        cb(ClassRoomes);
      }else{
        cb(null);
      }
    });
  },

  getClassRoomId :function(id,cb){
    model.ClassRoom.findOne({_id : id}).populate('room').exec(function(err, ClassRoomes){
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
    ClassRoom1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateClassRoom : function(id,body,cb){
    obj = body;
    model.ClassRoom.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  getAllClassesAndClassRoomsByYear : function(year,cb){
    console.log(year);
    model.ClassRoom.find({year:year},function(err, ClassRoomes){
      if(!err){
        console.log(ClassRoomes);
        cb(ClassRoomes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
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