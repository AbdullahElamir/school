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
    //a function is called to delete
    var deleteFun= function(){
      model.Subject.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["System"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        model[collections.pop()].find({"sys_class.selected.id_subject":id},function(err,result){
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
