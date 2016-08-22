var model = require('../models');
var room = null;

module.exports = {

  getAllRoom :function(cb){
    model.Room.find({}, function(err, rooms){
      if(!err){
        cb(rooms);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllRoomsBySearchValue
  getAllRoomsBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Room.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Room.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,rooms){
        if(!err){
          cb({result:rooms,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllRoomsCount
  getAllRoomCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Room.count({},function(err, count){
      model.Room.find({}).limit(limit).skip(page*limit).exec(function(err,rooms){
        if(!err){
          cb({result:rooms,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllRoomStatus:function(status,cb){
    model.Room.find({status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getRoomName :function(name,cb){
    model.Room.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getRoomId :function(id,cb){
    model.Room.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addRoom : function(body,cb){
    var obj =body;
    room = new model.Room(obj);
    room.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateRoom : function(id,body,cb){
    obj = body;
    model.Room.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  deleteRoom : function(id,cb){
    model.Study.find({customer:id}, function(err,resul) {
      if(resul.length > 0){
        cb(1);
      } else{
        model.Room.remove({_id:id}, function(err,result) {
          if (!err) {
            cb(2);
          } else {
            console.log(err);
            cb(3);
          }
        });
      }
    });
  }
  
};