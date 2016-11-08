var model = require('../models');
var Evaluation = null;

module.exports = {

  getAllEvaluation :function(school,cb){
    model.Evaluation.find({school:school,status:1}).sort({'_id':-1}).exec(function(err, Evaluations){
      if(!err){
        cb(Evaluations);
      }else{
        cb(null);
      }
    });
  },

  //getAllEvaluationsBySearchValue
  getAllEvaluationsBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Evaluation.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Evaluation.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Evaluations){
        if(!err){
          cb({result:Evaluations,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllEvaluationsCount
  getAllEvaluationCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Evaluation.count({},function(err, count){
      model.Evaluation.find({}).limit(limit).skip(page*limit).exec(function(err,Evaluations){
        if(!err){
          cb({result:Evaluations,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getAllEvaluationStatus:function(status,cb){
    model.Evaluation.find({status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        cb(null);
      }
    });
  },

  getEvaluationName :function(name,cb){
    model.Evaluation.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
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
    model.Evaluation.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  }
};
