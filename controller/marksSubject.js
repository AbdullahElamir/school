var model = require('../models');
var MarksSub1 = null;

module.exports = {

  getAllMarksSub :function(cb){
    model.MarksSub.find({status:1}).populate('exam').populate('subject').exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllMarksSubesBySearchValue
  getAllMarksSubesBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.MarksSub.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.MarksSub.find({name:new RegExp(searchValue, 'i')}).populate('exam').populate('subject').limit(limit).skip(page*limit).exec(function(err,MarksSubes){
        if(!err){
          cb({result:MarksSubes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllMarksSubCount
  getAllMarksSubCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.MarksSub.count({status:1},function(err, count){
      model.MarksSub.find({status:1}).limit(limit).populate('exam').populate('subject').skip(page*limit).exec(function(err,MarksSubes){
        if(!err){
          cb({result:MarksSubes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllMarksSubStatus:function(status,cb){
    model.MarksSub.find({status:status}).populate('exam').populate('subject').exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  

  getMarksSubId :function(id,cb){
    model.MarksSub.findOne({_id : id,status:1}).populate('exam').populate('subject').exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        cb(null);
      }
    });
  },
  // getMarksSubSubject :function(subject,cb){
  //   model.MarksSub.find({subject : subject,status:1}).populate('exam').populate('subject').exec(function(err, MarksSubes){
  //     if(!err){
  //       cb(MarksSubes);
  //     }else{
  //       cb(null);
  //     }
  //   });
  // },
  getMarksSubExam :function(exam,cb){
    model.MarksSub.find({exam : exam,status:1}).populate('exam').populate('subject').exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        cb(null);
      }
    });
  },

  getMarksSubExamSubject :function(exam,subject,semester,cb){
    model.MarksSub.find({exam : exam,status:1,semester:semester,subject:subject}).populate('exam').populate('subject').exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        cb(null);
      }
    });
  },
  getMarksSubSubject :function(subject,system,cb){
    model.MarksSub.find({system:system,subject:subject}).populate('exam').populate('subject').sort({'exam.semester':1,'exam.type':1}).exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  // getMarksSubId :function(id,cb){
  //   model.MarksSub.findOne({_id : id,status:1}).populate('exam').populate('subject').exec(function(err, MarksSubes){
  //     if(!err){
  //       cb(MarksSubes);
  //     }else{
  //       cb(null);
  //     }
  //   });
  // },

  addMarksSub : function(body,cb){
    var obj =body;
    MarksSub1 = new model.MarksSub(obj);
    MarksSub1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateMarksSub : function(id,body,cb){
    var obj = body;
    model.MarksSub.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  }
  
  // deleteMarksSub : function(id,cb){
  //   model.MarksSub.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }
  
};