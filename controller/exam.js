var model = require('../models');
var Exam1 = null;

module.exports = {

  getAllExam :function(cb){
    model.Exam.find({status:1}).populate('system').populate('clas').exec(function(err, Exames){
      if(!err){
        cb(Exames);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllExamesBySearchValue
  getAllExamesBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Exam.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Exam.find({name:new RegExp(searchValue, 'i')}).populate('system').populate('clas').limit(limit).skip(page*limit).exec(function(err,Exames){
        if(!err){
          cb({result:Exames,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllCustomerCount
  getAllExamCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Exam.count({status:1},function(err, count){
      model.Exam.find({status:1}).limit(limit).populate('system').populate('clas').skip(page*limit).exec(function(err,Exames){
        if(!err){
          cb({result:Exames,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllExamStatus:function(status,cb){
    model.Exam.find({status:status}).populate('system').populate('clas').exec(function(err, Exames){
      if(!err){
        cb(Exames);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getExamName :function(name,cb){
    model.Exam.find({name :{ $regex:name, $options: 'i' }}).populate('system').populate('clas').limit(30).exec(function(err, Exames){
      if(!err){
        cb(Exames);
      }else{
        cb(null);
      }
    });
  },

  getExamId :function(id,cb){
    model.Exam.findOne({_id : id,status:1}).populate('system').populate('clas').exec(function(err, Exames){
      if(!err){
        cb(Exames);
      }else{
        cb(null);
      }
    });
  },

  addExam : function(body,cb){
    var obj =body;
    Exam1 = new model.Exam(obj);
    Exam1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateExam : function(id,body,cb){
    obj = body;
    model.Exam.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  getExamSClass:function(clas,system,cb){
    model.Exam.find({system:system,clas:clas}).distinct('_id',function(err, exam){
      if(!err){
        cb(exam);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  // deleteExam : function(id,cb){
  //   model.Exam.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }
  
};