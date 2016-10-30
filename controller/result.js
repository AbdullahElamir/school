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
  studentStatus:function(students,std,classRoom,cb){
    model.Stupro.findOne({student:students[std]._id,classRoom:classRoom},function(err,result){
      if(!err){
        model.Result.aggregate([
          {$match : {StuPro:result._id}},
          {$group : {
             _id : "$subject",
             exams : {$push:{exam:"$exam",mark:"$mark"}}
          }}
        ]).exec(function(err,results){
          if(!err){
            var flag = 0;
            var exams = {};
            var rs = 0;
            for(var res in results){
              if(flag === 2) break;
              var degree=0,sum=0,final=false,second=false,finalSum=0;
              var rslt = results[res];
              for(var exa in rslt.exams){
                if(flag === 2) break;
                var func = function(ex){
                  var exam = rslt.exams[ex];
                  model.MarksSub.findOne({exam:exam.exam,subject:rslt._id})
                  .populate("exam")
                  .exec(function(err,exm){
                    if(!err){
                      exams[exam.exam]=exm;
                      switch(exm.exam.type){
                        case 2:
                        case 3:
                          degree+=exam.mark;
                          sum+=exm.mark;
                          break;
                        case 4:
                          degree+=exam.mark;
                          sum+=exm.mark;
                          final = exam.mark;
                          finalSum = exm.mark;
                          if(second!==false){
                            degree-=exam.mark;
                            sum-=exm.mark;
                          }
                          break;
                        case 5:
                          if(exam.mark>0){
                            degree+=exam.mark;
                            sum+=exm.mark;
                            second=exam.mark;
                            if(final!==false){
                              degree-=final;
                              sum-=finalSum;
                            }
                          }
                          break;
                      }
                      if(ex == rslt.exams.length-1){
                        //success
                        if(degree/sum >= 0.5){
                          if(second!==false && flag === 0){
                            flag = 1;
                          }
                        }else{
                          if(flag != 2){
                            flag = 2;
                            cb(std,flag);
                          }
                        }
                        rs++;
                        if(rs == results.length-1 && flag !== 2){
                          cb(std,flag);
                        }
                      }
                    }
                  });
                };
                func(exa);
              }
            }
          }
        });
      }
    });
  },

  getResultSubject:function(StuPro,exam,subject,cb){
    model.Result.find({StuPro:StuPro,exam:{$in:exam},subject:subject},function(err, Result){
      if(!err){
        var mark=[];
        if(Result.length===0){
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
