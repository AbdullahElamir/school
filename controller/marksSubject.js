var model = require('../models');
var MarksSub1 = null;

module.exports = {

  getAllMarksSub :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.MarksSub.find(q).populate('exam').populate('subject').exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllMarksSubesBySearchValue
  getAllMarksSubesBySearchValue :function(school,searchValue,limit,page,cb){
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
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.MarksSub.count(q,function(err, count){
      model.MarksSub.find(q).limit(limit).populate('exam').populate('subject').skip(page*limit).exec(function(err,MarksSubes){
        if(!err){
          cb({result:MarksSubes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllMarksSubStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.MarksSub.find(q).populate('exam').populate('subject').exec(function(err, MarksSubes){
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

  getMarksSubExam :function(school,exam,cb){
    var q= {
      status:1,
      exam : exam
    };
    if(school!= -1){
      q.school=school
    }
    model.MarksSub.find(q).populate('exam').populate('subject').exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        cb(null);
      }
    });
  },

  getMarksSubExamSubject :function(school,exam,subject,semester,cb){
    var q= {
      status:1,
      exam : exam,
      semester:semester,
      subject:subject
    };
    if(school!= -1){
      q.school=school
    }
    model.MarksSub.find(q).populate('exam').populate('subject').exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        cb(null);
      }
    });
  },
  getMarksSubSubject :function(school,subject,system,cb){
    var q= {
      status:1,
      system:system,
      subject:subject
    };
    if(school!= -1){
      q.school=school
    }
    model.MarksSub.find(q).populate('exam').populate('subject').sort({'exam.semester':1,'exam.type':1}).exec(function(err, MarksSubes){
      if(!err){
        cb(MarksSubes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },


  addMarksSub : function(body,cb){
    var obj =body;
    MarksSub1 = new model.MarksSub(obj);
    MarksSub1.save(function(err){
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
    model.MarksSub.findOneAndUpdate({_id:id}, obj, function(err) {
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