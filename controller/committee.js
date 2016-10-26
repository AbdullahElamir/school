var model = require("../models");
var committee = null , examCommittees = null;

module.exports = {

  getAllCommittees :function(cb){
    model.Committee.find({},function(err, committees){
      if(!err){
        cb(committees);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getCommitteesBySearchValueAndYear
  getCommitteesBySearchValueAndYear :function(searchValue,year,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    if( year != "all" ){
      model.Committee.count({name:new RegExp(searchValue, 'i'),year:year})
        .populate('room')
        .exec(function(err,count){
          model.Committee.find({name:new RegExp(searchValue, 'i'),year:year})
          .limit(limit)
          .skip(page*limit)
          .populate('room')
          .exec(function(err,committees){
            if(!err){
              cb({result:committees,count:count});
            }else{
              //console.log(err);
              cb(null);
            }
          });
        });
    } else {
      model.Committee.count({name:new RegExp(searchValue, 'i')})
        .populate('room')
        .exec(function(err,count){
          model.Committee.find({name:new RegExp(searchValue, 'i')})
          .limit(limit)
          .skip(page*limit)
          .populate('room')
          .exec(function(err,committees){
            if(!err){
              cb({result:committees,count:count});
            }else{
              //console.log(err);
              cb(null);
            }
          });
        });
    }
  } , 
  
  //getAllCommitteesCount
  getAllCommitteesCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Committee.count({},function(err, count){
      model.Committee.find({}).limit(limit).skip(page*limit).exec(function(err,committees){
        if(!err){
          cb({result:committees,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllCommitteesStatus:function(status,cb){
    model.Committee.find({status:status},function(err, committees){
      if(!err){
        cb(committees);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getCommitteeName :function(name,cb){
    model.Committee.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getCommitteeId :function(id,cb){
    model.Committee.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addCommittee : function(body,cb){
    model.Year.findOne({active : 1}, function(err, custom){
      if(!err && custom != null ){
        var obj = body;
        obj.year = custom._id;
        committee = new model.Committee(obj);
        committee.save(function(err,result){
          if (!err) {
            cb({status : 1});
          } else {
            // console.log(err);
            cb({status : 2});
          }
        });
      }else{
        //console.log(err);
        cb({status : 3});
      }
    });
  },

  updateCommittee : function(id,body,cb){
    var obj = body;
    model.Committee.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteCommittee : function(id,cb){
    model.Committee.remove({_id:id}, function(err,result1) {
      if (!err) {
        model.ExamCommittee.remove({committee:id}, function(err,result2) {
          if (!err) {
            cb(2);
          } else {
            // console.log(err);
            cb(3);
          }
        });
      } else {
        // console.log(err);
        cb(3);
      }
    });
  },
  
  getAllExamCommittees :function(cb){
    model.ExamCommittee.find({},function(err, examCommittees){
      if(!err){
        cb(examCommittees);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getExamCommitteesBySearchValue
  getExamCommitteesBySearchValue :function(id_of_committee,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.ExamCommittee.count({notes:new RegExp(searchValue, 'i'),committee:id_of_committee})
    .populate('clas')
    .populate('exam')
    .exec(function(err,count){
      model.ExamCommittee.find({notes:new RegExp(searchValue, 'i'),committee:id_of_committee})
      .limit(limit)
      .skip(page*limit)
      .populate('clas')
      .populate('exam')
      .exec(function(err,examCommittees){
        if(!err){
          cb({result:examCommittees,count:count});
        }else{
          //console.log(err);
          cb(null);
        }
      });
    });
  } , 
  
  //getAllExamCommitteesCount
  getAllExamCommitteesCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.ExamCommittee.count({},function(err, count){
      model.ExamCommittee.find({}).limit(limit).skip(page*limit).exec(function(err,examCommittees){
        if(!err){
          cb({result:examCommittees,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllExamCommitteesStatus:function(status,cb){
    model.ExamCommittee.find({status:status},function(err, examCommittees){
      if(!err){
        cb(examCommittees);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getExamCommitteeId :function(id,cb){
    model.ExamCommittee.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getFullStudentsExamCommitteeId :function(id,cb){
    model.ExamCommittee.findOne({_id : id})
      .populate('students.examCommitteeStudents')
      .exec(function(err, custom){
      if(!err){
        var array = [];
        if( custom.students.length == 0 ){
          cb([]);
        }
        for(var i in custom.students ){
          array.push(custom.students[i].examCommitteeStudents);
          if( i == custom.students.length-1 ){
            cb(array);
          }
        }
      }else{
        cb(null);
      }
    });
  },

  addExamCommittee : function(body,cb){
    var obj = body;
    examCommittees = new model.ExamCommittee(obj);
    examCommittees.save(function(err,result){
      if (!err) {
        cb({status : 1});
      } else {
        // console.log(err);
        cb({status : 2});
      }
    });
  },

  updateExamCommittee : function(id,body,cb){
    var obj = body;
    model.ExamCommittee.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteExamCommittee : function(id,cb){
    model.ExamCommittee.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  },

  updateStudents : function(id,students,cb){
    var array = [];
    if( students.length == 0 ){
      model.ExamCommittee.update({_id:id},{$set :{ students:array }},{upsert: true}, function(err,result) {
        if (!err) {
          cb({status : 1});
        } else {
          // console.log(err);
          cb({status : 2});
        }
      });
    }
    for(var i in students){
      array.push({examCommitteeStudents : students[i]._id});
      if( i == students.length-1 ){
        model.ExamCommittee.update({_id:id},{$set :{ students:array }},{upsert: true}, function(err,result) {
          if (!err) {
            cb({status : 1});
          } else {
            // console.log(err);
            cb({status : 2});
          }
        });
      }
    }
  },
  
  getFullProctorsExamCommitteeId :function(id,cb){
    model.Committee.findOne({_id : id})
      .populate('proctors.examCommitteeProctors')
      .exec(function(err, custom){
      if(!err){
        var array = [];
        if( custom.proctors.length == 0 ){
          cb([]);
        }
        for(var i in custom.proctors ){
          array.push(custom.proctors[i].examCommitteeProctors);
          if( i == custom.proctors.length-1 ){
            cb(array);
          }
        }
      }else{
        cb(null);
      }
    });
  },
  
  updateProctors : function(id,proctors,cb){
    var array = [];
    if( proctors.length == 0 ){
      model.Committee.update({_id:id},{$set :{ proctors:array }},{upsert: true}, function(err,result) {
        if (!err) {
          cb({status : 1});
        } else {
          // console.log(err);
          cb({status : 2});
        }
      });
    }
    for(var i in proctors){
      array.push({examCommitteeProctors : proctors[i]._id});
      if( i == proctors.length-1 ){
        model.Committee.update({_id:id},{$set :{ proctors:array }},{upsert: true}, function(err,result) {
          if (!err) {
            cb({status : 1});
          } else {
            // console.log(err);
            cb({status : 2});
          }
        });
      }
    }
  }
  
};