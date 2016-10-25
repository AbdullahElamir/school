var model = require('../models');
var Result = null;

module.exports = {

  getAllResult :function(cb){
    model.Result.find({}, function(err, Results){
      if(!err){
        cb(Results);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  

  //getAllResultsCount
  getAllResultCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Result.count({},function(err, count){
      model.Result.find({}).limit(limit).skip(page*limit).exec(function(err,Results){
        if(!err){
          cb({result:Results,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllResultStatus:function(status,cb){
    model.Result.find({status:status},function(err, Result){
      if(!err){
        cb(Result);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  getResultSubject:function(StuPro,exam,subject,cb){
    model.Result.find({StuPro:StuPro,exam:{$in:exam},subject:subject},function(err, Result){
      if(!err){
        var mark=[];
        if(Result.length==0){
          cb(mark);
        }
        for(var j in Result){
          mark[Result[j].exam]=Result[j].mark;
          if(j==Result.length-1){
            cb(mark);
          }
        }
        
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getResultId :function(id,cb){
    model.Result.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addResult : function(body,cb){
    var obj =body;
    Result = new model.Result(obj);
    Result.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateResult : function(id,body,cb){
    var obj = body;
    model.Result.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  addResultUpdate : function(body,cb){
    var obj = body;
    model.Result.findOneAndUpdate({StuPro:obj.StuPro,exam:obj.exam,subject:obj.subject}, {mark:obj.mark}, function(err,result) {
      if (!err) {
        if(result){
          cb(true);  
        }else{
          Result = new model.Result(obj);
          Result.save(function(err,result){
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