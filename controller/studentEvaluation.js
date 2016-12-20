var model = require('../models');
var stueva = null;

module.exports = {

  getAllStueva :function(cb){
    model.Stueva.find({}, function(err, Stuevas){
      if(!err){
        cb(Stuevas);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllStuevasCount
  getAllStuevaCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Stueva.count({},function(err, count){
      model.Stueva.find({}).limit(limit).skip(page*limit).exec(function(err,Stuevas){
        if(!err){
          cb({result:Stuevas,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllStuevaStatus:function(status,cb){
    model.Stueva.find({status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  

  getStuevaId :function(id,cb){
    model.Stueva.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },


  updateStueva : function(id,body,cb){
    var obj = body;
    model.Stueva.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getStuEva : function(stupro,course,month,half,cb){
    model.Stueva.find({$and:[{StuPro:stupro},{course:course},{month:month},{half:half} ]}, function(err, Stuevas){
      if (!err) {
        var obj =[];
        if( Stuevas.length==0){
          cb(obj);
        }
        for( var k in Stuevas){
          obj[Stuevas[k].evaluation]=Stuevas[k].level;
          if(k == Stuevas.length-1){
            cb(obj);
          }
        }
      } else {
        // console.log(err);
        cb(null);
      }
    });
  },
  addStuEva : function(stupro,course,month,half,body,cb){
    model.Stueva.findOneAndUpdate({$and:[{StuPro:stupro},{course:course},{month:month},{half:half},{evaluation:body._id}]},{level:body.rating},function(err ,result){
      if (!err) {
        if(result){  
          cb(true);  
        }else{
          var obj ={
            StuPro:stupro,
            evaluation:body._id,
            course:course,
            level:body.rating,
            month:month,
            half:half
          };
          stueva = new model.Stueva(obj);
          stueva.save(function(err){
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
  
  
};