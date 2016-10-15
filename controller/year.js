var model = require('../models');
var Year1 = null;

module.exports = {

  getAllYear :function(school,cb){
    model.Year.find({school:school,status:1}, function(err, Years){
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
    model.Year.count({school:school,name:new RegExp(searchValue, 'i')},function(err, count){
      model.Year.find({school:school,name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Years){
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
    model.Year.count({school:school,status:1},function(err, count){
      model.Year.find({school:school,status:1}).limit(limit).skip(page*limit).exec(function(err,Years){
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
    model.Year.find({school:school,status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getYearName :function(school,name,cb){
    model.Year.find({school:school,name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getYearId :function(id,cb){
    model.Year.findOne({_id : id}, function(err, custom){
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
    Year1.save(function(err,result){
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
    model.Year.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  getActiveYear : function(school,cb){
    model.Year.findOne({active : 1,school:school}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },
  activate: function (school,id,cb) {
    model.Year.update({school:school}, {active:0},{multi: true}, function(err,result) {
      if (!err) {
        model.Year.findOneAndUpdate({_id:id}, {active:1}, function(err,result) {
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
    model.Year.update({_id:id}, {active:0},{multi: true}, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteYear : function(id,cb){
    model.Fees.find({year:id}, function(err,result) {
      if(result.length > 0){
        cb(1);
      } else{
        model.Year.remove({_id:id}, function(err,result) {
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
