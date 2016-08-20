var model = require('../models');
var class1 = null;

module.exports = {

  getAllClass :function(cb){
    model.Class.find({}, function(err, classes){
      if(!err){
        cb(classes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  //getAllCustomerCount
  getAllClassCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Class.count({},function(err, count){
      model.Class.find({}).limit(limit).skip(page*limit).exec(function(err,classes){
        if(!err){
          cb({result:classes,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllClassStatus:function(status,cb){
    model.Class.find({status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getClassName :function(name,cb){
    model.Class.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getClassId :function(id,cb){
    model.Class.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addClass : function(body,cb){
    var obj =body;
    class1 = new model.Class(obj);
    class1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateClass : function(id,body,cb){
    obj = body;
    model.Class.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  deleteClass : function(id,cb){
    model.Study.find({customer:id}, function(err,resul) {
      if(resul.length > 0){
        cb(1);
      } else{
        model.Class.remove({_id:id}, function(err,result) {
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