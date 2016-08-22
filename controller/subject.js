var model = require("../models");
var subject = null;

module.exports = {

  getAllSubject :function(cb){
    model.Subject.find({})
    .populate('clas')
    .exec(function(err, Subjects){
      if(!err){
        cb(Subjects);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllStudentsBySearchValue
  getSubjectsBySearchValueAndClass :function(searchValue,clas,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    if( clas != "all" ){
      model.Subject.count({$and :[{name:new RegExp(searchValue, 'i')},{clas:clas}]},function(err, count){
        model.Subject.find({$and :[{name:new RegExp(searchValue, 'i')},{clas:clas}]}).limit(limit).skip(page*limit).populate('clas').exec(function(err,subjects){
          if(!err){
            cb({result:subjects,count:count});
          }else{
            console.log(err);
            cb(null);
          }
        });
      });
    } else {
      model.Subject.count({name:new RegExp(searchValue, 'i')},function(err, count){model.Subject.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).populate('clas').exec(function(err,subjects){
          if(!err){
            cb({result:subjects,count:count});
          }else{
            console.log(err);
            cb(null);
          }
        });
      });
    }
  },

  //getAllCustomerCount
  getAllSubjectCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Subject.count({},function(err, count){
      model.Subject.find({}).limit(limit).skip(page*limit)
      .populate('clas')
      .exec(function(err,subjects){
        if(!err){
          cb({result:subjects,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllSubjectStatus:function(status,cb){
    model.Subject.find({status:status})
    .populate('clas')
    .exec(function(err, subjects){
      if(!err){
        cb(subjects);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getSubjectName :function(name,cb){
    model.Subject.find({name :{ $regex:name, $options: 'i' }}).limit(30)
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
    subject.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateSubject : function(id,body,cb){
    obj = body;
    model.Subject.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  deleteSubject : function(id,cb){
    model.Subject.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        console.log(err);
        cb(3);
      }
    });
  }
  
};