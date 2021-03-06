var model = require('../models');
var room = null;

module.exports = {

  getAllRoom :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Room.find(q, function(err, rooms){
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
    var q= {
      status:1,
      name:new RegExp(searchValue, 'i')
    };
    if(school!= -1){
      q.school=school
    }
    model.Room.count(q,function(err, count){
      model.Room.find(q).limit(limit).skip(page*limit).exec(function(err,rooms){
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
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Room.count(q,function(err, count){
      model.Room.find(q).limit(limit).skip(page*limit).exec(function(err,rooms){
        if(!err){
          cb({result:rooms,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getAllRoomStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Room.find(q,function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  getRoomName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.Room.find(q).limit(30).exec(function(err, custom){
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
    //a function is called to delete
    var deleteFun= function(){
      model.Room.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["ClassRoom","Committee"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        model[collections.pop()].find({room:id},function(err,result){
          if(!err){
            //contenue finding in the other collections
            if(result.length===0){
              check();
            }else{
              //this means that there is a document that have this id and we shouldn't delete
              cb(1);
            }
          }else {
            //error
            cb(3);
          }
        });
      }else{
        //this means that we finished the all collections array so delete
        deleteFun();
      }
    };
    check();
  }
};
