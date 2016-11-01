var model = require("../models");
var subject = null;

module.exports = {

  getAllSubject :function(school,cb){
    model.Subject.find({school:school,status:1})
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
    if( clas != "all" ){
      model.Subject.count({school:school,$and :[{name:new RegExp(searchValue, 'i')},{clas:clas}]},function(err, count){
        model.Subject.find({school:school,$and :[{name:new RegExp(searchValue, 'i')},{clas:clas}]}).limit(limit).skip(page*limit).populate('clas').exec(function(err,subjects){
          if(!err){
            cb({result:subjects,count:count});
          }else{
            // console.log(err);
            cb(null);
          }
        });
      });
    } else {
      model.Subject.count({school:school,name:new RegExp(searchValue, 'i')},function(err, count){ 
        model.Subject.find({school:school,name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).populate('clas').exec(function(err,subjects){
          if(!err){
            cb({result:subjects,count:count});
          }else{
            // console.log(err);
            cb(null);
          }
        });
      });
    }
  },

  //getAllCustomerCount
  getAllSubjectCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Subject.count({school:school,status:1},function(err, count){
      model.Subject.find({school:school,status:1}).limit(limit).skip(page*limit)
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
    model.Subject.find({school:school,status:status})
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
    model.Subject.find({school:school,name :{ $regex:name, $options: 'i' }}).limit(30)
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