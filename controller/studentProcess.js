
var model = require("../models");
var Stupro = null;

module.exports = {

  getAllStupro :function(cb){
    model.Stupro.find({},function(err, Stupros){
      if(!err){
        cb(Stupros);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },





  //getAllCustomerCount
  getAllStuprosCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Stupro.count({},function(err, count){
      model.Stupro.find({}).limit(limit).skip(page*limit).exec(function(err,Stupros){
        if(!err){
          cb({result:Stupros,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllStuproStatus:function(status,cb){
    model.Stupro.find({status:status},function(err, Stupros){
      if(!err){
        cb(Stupros);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  


  getStuproId :function(id,cb){
    model.Stupro.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addStupro : function(body,cb){
    obj = body

    Stupro = new model.Stupro(obj);
    Stupro.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateStupro : function(id,body,cb){
    obj = body
    model.Stupro.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  getAllClassRoomeStudentsByYear : function(classRoom,year,cb){
    model.Stupro.find({classRoom:classRoom,year:year}).populate('student')
    .exec(function(err,Stupros) {
      if(!err){
        cb(Stupros);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  getStudentClassRoom : function(classRoom,cb){
   model.Stupro.find({classRoom:classRoom}).distinct('_id',function(err, Stupros){
    if(!err){
      cb(Stupros);
    }else{
      console.log(err);
      cb(null);
    }
   });
  },
  getStuproRoom : function(classRoom,cb){
   model.Stupro.find({classRoom:{$in:classRoom}}).distinct('student',function(err, Stupros){
    if(!err){
      cb(Stupros);
    }else{
      console.log(err);
      cb(null);
    }
   });
  },
};