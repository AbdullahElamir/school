var model = require('../models');
var Year1 = null;

module.exports = {

  getAllYear :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Year.find(q, function(err, Years){
      if(!err){
        cb(Years);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllYearsBySearchValue
  getAllYearsBySearchValue :function(school,searchValue,limit,page,cb){
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
    model.Year.count(q,function(err, count){
      model.Year.find(q).limit(limit).skip(page*limit).exec(function(err,Years){
        if(!err){
          cb({result:Years,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllYearsCount
  getAllYearCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Year.count(q,function(err, count){
      model.Year.find(q).limit(limit).skip(page*limit).exec(function(err,Years){
        if(!err){
          cb({result:Years,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllYearStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Year.find(q,function(err, classes){
      if(!err){
        cb(classes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getYearName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.Year.find(q).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getYearId :function(id,cb){
    model.Year.findOne({_id : id}).populate('system')
    .exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addYear : function(body,cb){
    var obj =body;
    Year1 = new model.Year(obj);
    Year1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateYear : function(id,body,cb){
    var obj = body;
    model.Year.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  getActiveYear : function(school,cb){
    var q= {
      status:1,
      active : 1
    };
    if(school!= -1){
      q.school=school
    }
    model.Year.findOne(q, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  activate: function (school,id,cb) {
    model.Year.update({school:school}, {active:0},{multi: true}, function(err) {
      if (!err) {
        model.Year.findOneAndUpdate({_id:id}, {active:1}, function(err) {
          if (!err) {
            cb(true);
          } else {
            // console.log(err);
            cb(false);
          }
        });
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  disActivate: function (id,cb) {
    model.Year.update({_id:id}, {active:0},{multi: true}, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteYear : function(id,cb){
    //a function is called to delete
    var deleteFun= function(){
      model.Year.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["ClassRoom","Fees","TSC"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        model[collections.pop()].find({year:id},function(err,result){
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
