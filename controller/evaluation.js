var model = require('../models');
var Evaluation = null;

module.exports = {

  getAllEvaluation :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Evaluation.find(q, function(err, Evaluations){
      if(!err){
        cb(Evaluations);
      }else{
        cb(null);
      }
    });
  },

  //getAllEvaluationsBySearchValue
  getAllEvaluationsBySearchValue :function(school,searchValue,limit,page,cb){
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
    model.Evaluation.count(q,function(err, count){
      model.Evaluation.find(q).limit(limit).skip(page*limit).exec(function(err,Evaluations){
        if(!err){
          cb({result:Evaluations,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllEvaluationsCount
  getAllEvaluationCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Evaluation.count(q,function(err, count){
      model.Evaluation.find(q).limit(limit).skip(page*limit).exec(function(err,Evaluations){
        if(!err){
          cb({result:Evaluations,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getAllEvaluationStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Evaluation.find(q,function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  getEvaluationName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.Evaluation.find(q).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getEvaluationId :function(id,cb){
    model.Evaluation.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addEvaluation : function(body,cb){
    var obj =body;
    Evaluation = new model.Evaluation(obj);
    Evaluation.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  updateEvaluation : function(id,body,cb){
    var obj = body;
    model.Evaluation.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },
  deleteEvaluation : function(id,cb){
    //a function is called to delete
    var deleteFun= function(){
      model.Evaluation.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["Stueva"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        model[collections.pop()].find({evaluation:id},function(err,result){
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
