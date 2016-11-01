var model = require('../models');
var class1 = null;

module.exports = {

  getAllClass :function(school,cb){
    model.Class.find({school:school,status:1}, function(err, classes){
      if(!err){
        cb(classes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getClassesByYear :function(school,year_id,cb){
    model.Year.findOne({school:school , _id:year_id}, function(err, year_obj){
      if(!err){
        model.System.findOne({school:school , _id:year_obj.system})
        .populate('sys_class.id_class')
        .exec(function(err, system){
          if(!err){
            var classes = [];
            if( system.sys_class.length == 0 ){
              cb([]);
              return;
            }
            for(var i in system.sys_class ){
              classes.push(system.sys_class[i].id_class);
              if( i == system.sys_class.length-1 ){
                cb(classes);
              }
            }
          }else{
            cb(null);
          }
        });
      }else{
        cb(null);
      }
    });
  },
  
  getExamsByYearAndClass : function(school,year,clas,cb){
    model.Year.findOne({school:school , _id:year}, function(err, year_obj){
      if(!err){
        model.Exam.find({school:school , system:year_obj.system ,clas:clas,type : { $ne: 2 } },function(err, exams){
          if(!err){
            cb(exams);
          } else {
            cb(null);
          }
        });
      } else {
        cb(null);
      }
    });
  },
  
  //getAllClassesBySearchValue
  getAllClassesBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Class.count({school:school,name:new RegExp(searchValue, 'i')},function(err, count){
      model.Class.find({school:school,name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).populate("prevClass").exec(function(err,classes){
        if(!err){
          cb({result:classes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllCustomerCount
  getAllClassCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Class.count({school:school,status:1},function(err, count){
      model.Class.find({school:school,status:1}).limit(limit).skip(page*limit).populate("prevClass").exec(function(err,classes){
        if(!err){
          cb({result:classes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllClassRoomsByClassAndYear : function(clas,year,cb){
    model.ClassRoom.find({class:clas,year:year},function(err, classRooms){
      if(!err){
        cb(classRooms);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getAllClassStatus:function(school,status,cb){
    model.Class.find({school:school,status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getClassName :function(school,name,cb){
    model.Class.find({school:school,name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  getClassId :function(id,cb){
    model.Class.findOne({_id : id}, function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  addClass : function(body,cb){
    var obj =body;
//    console.log(body);
    class1 = new model.Class(obj);
    class1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateClass : function(id,body,cb){
    var obj = body;
    model.Class.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteClass : function(id,cb){
    model.Class.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }

};
