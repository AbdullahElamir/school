var model = require('../models');
var Exam1 = null;

module.exports = {

  getAllExam :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Exam.find(q).populate('system').populate('clas').exec(function(err, Exames){
      if(!err){
        cb(Exames);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllExamesBySearchValue
  getAllExamesBySearchValue :function(school,searchValue,limit,page,cb){
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
    model.Exam.count(q,function(err, count){
      model.Exam.find(q).populate('system').populate('clas').limit(limit).skip(page*limit).exec(function(err,Exames){
        if(!err){
          cb({result:Exames,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllCustomerCount
  getAllExamCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Exam.count(q,function(err, count){
      model.Exam.find(q).limit(limit).populate('system').populate('clas').skip(page*limit).exec(function(err,Exames){
        if(!err){
          cb({result:Exames,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllExamStatus:function(status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Exam.find({status:status}).populate('system').populate('clas').exec(function(err, Exames){
      if(!err){
        cb(Exames);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  getExamName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.Exam.find(q).populate('system').populate('clas').limit(30).exec(function(err, Exames){
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
    Exam1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateExam : function(id,body,cb){
    var obj = body;
    model.Exam.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getExamSClass:function(clas,system,cb){
    model.Exam.find({system:system,clas:clas}).distinct('_id',function(err, exam){
      if(!err){
        cb(exam);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  getAllExamS : function(system,clas,school,cb){
    model.Exam.find({system:system,clas:clas,school:school}).sort({semester:1,type:1,_id:1}).exec(function(err, Exames){
      if(!err){
        cb(Exames);
      }else{
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