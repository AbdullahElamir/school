var model = require('../models');
var room = null;

module.exports = {

  getAllRoom :function(school,cb){
    model.Room.find({school:school,status:1}, function(err, rooms){
      if(!err){
        cb(rooms);
      }else{
        cb(null);
      }
    });
  },

  //getAllRoomsBySearchValue
  getAllRoomsBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Room.count({school:school,name:new RegExp(searchValue, 'i')},function(err, count){
      model.Room.find({school:school,name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,rooms){
        if(!err){
          cb({result:rooms,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllRoomsCount
  getAllRoomCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Room.count({school:school,status:1},function(err, count){
      model.Room.find({school:school,status:1}).limit(limit).skip(page*limit).exec(function(err,rooms){
        if(!err){
          cb({result:rooms,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getAllRoomStatus:function(school,status,cb){
    model.Room.find({school:school,status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  getRoomName :function(school,name,cb){
    model.Room.find({name :{ $regex:name, $options: 'i' },school:school}).limit(30).exec(function(err, custom){
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
    room.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  updateRoom : function(id,body,cb){
    var obj = body;
    model.Room.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  deleteRoom : function(id,cb){
    model.Room.find({customer:id}, function(err,resul) {
      if(resul.length > 0){
        cb({result:1});
      } else{
          model.Room.remove({_id:id}, function(err) {
            if (!err) {
              cb({result:2});
            } else {
              // console.log(err);
              cb({result:3});
            }
          });
        }
      });
    },
  };
