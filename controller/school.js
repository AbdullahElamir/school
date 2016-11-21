var model = require("../models");
var school=null;

module.exports = {

  getSchoolsBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.School.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.School.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Schools){
        if(!err){
          cb({result:Schools,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllSchoolsCount
  getAllSchoolCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.School.count({},function(err, count){
      model.School.find({}).limit(limit).skip(page*limit).exec(function(err,Schools){
        if(!err){
          cb({result:Schools,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getSchoolInfo :function(id,cb){
    model.School.findOne({_id : id}, function(err, school){
      if(!err){
        cb(school);
      }else{
        //console.log(err);
        // cb(null);
      }
    });
  },
  getAllSchool :function(cb){
    model.School.find({status : 1}, function(err, school){
      if(!err){
        cb(school);
      }else{
        cb(null);
      }
    });
  },
  updateSchool : function(id,body,cb){
    var obj = body;
    model.School.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  addSchool : function(body,cb){
    var obj =body;
    school = new model.School(obj);
    school.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  deleteSchool : function(id,cb){
    //a function is called to delete
    var deleteFun= function(){
      model.School.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["Admin","Bus","Check","Class","Clothes","Driver","Evaluation","InOutcomeType","Other","Parent","Room","Student","Teacher","Vaccination"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        model[collections.pop()].find({school:id},function(err,school){
          if(!err){
            //if this collection does not restrict this school from deleting contenue finding in the other collections
            if(school.length===0){
              check();
            }else{
              //this means that there is a document that have this school id and we shouldn't delete the school
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
