var model = require("../models");
var subject = null;

module.exports = {

  getAllSubject :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Subject.find(q)
    .populate('clas')
    .exec(function(err, Subjects){
      if(!err){
        cb(Subjects);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getSubjectsByClass :function(clas,cb){
    model.Subject.find({clas:clas})
    .exec(function(err, Subjects){
      if(!err){
        cb(Subjects);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllStudentsBySearchValue
  getSubjectsBySearchValueAndClass :function(school,searchValue,clas,limit,page,cb){
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
    if( clas != "all" ){
      q.clas=clas;
    }
    model.Subject.count(q,function(err, count){
      model.Subject.find(q).limit(limit).skip(page*limit).populate('clas').exec(function(err,subjects){
        if(!err){
          cb({result:subjects,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllCustomerCount
  getAllSubjectCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Subject.count(q,function(err, count){
      model.Subject.find(q).limit(limit).skip(page*limit)
      .populate('clas')
      .exec(function(err,subjects){
        if(!err){
          cb({result:subjects,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllSubjectStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Subject.find(q)
    .populate('clas')
    .exec(function(err, subjects){
      if(!err){
        cb(subjects);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  getSubjectName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.Subject.find(q).limit(30)
    .populate('clas')
    .exec(function(err, custom){ 
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },
  //.populate('clas')
  getSubjectId :function(id,cb){
    model.Subject.findOne({_id : id})
    .populate('clas')
    .exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addSubject : function(body,cb){
    var obj = body;
    subject = new model.Subject(obj);
    subject.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateSubject : function(id,body,cb){
    var obj = body;
    model.Subject.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  
  deleteSubject : function(id,cb){
    model.Study.find({customer:id}, function(err,resul) {
      if(resul.length > 0){
        cb(1);
      } else{
        model.Subject.remove({_id:id}, function(err) {
          if (!err) {
            cb(2);
          } else {
            // console.log(err);
            cb(3);
          }
        });
      }
    });
  }
  
};