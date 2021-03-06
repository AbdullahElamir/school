var model = require('../models');

module.exports = {

  //getAllInOutcomesBySearchValue
  getAllInOutcomesBySearchValue :function(school,cat,type,searchValue,limit,page,startDate,finishDate,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var d1 = new Date(startDate);
    var d2 = new Date(finishDate);
    d1.setHours(0);
    d1.setMinutes(0);
    d1.setSeconds(0);
    d2.setHours(23);
    d2.setMinutes(59);
    d2.setSeconds(59);
    var q= {
      status:1,
      title:new RegExp(searchValue, 'i'),
      type:type,
      date:{"$gte": new Date(d1), "$lte": new Date(d2)}
    };
    if(school!= -1){
      q.school=school
    }
    if(cat !== "all"){
      q.inOutcomeType=cat;
    }

    model.InOutcome.count(q,function(err, count){
      model.InOutcome.find(q).limit(limit).skip(page*limit).populate('inOutcomeType').exec(function(err,InOutcomes){
        if(!err){
          cb({result:InOutcomes,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllInOutcomesCount
  getAllInOutcomeCount :function(school,cat,type,limit,page,startDate,finishDate,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var d1 = new Date(startDate);
    var d2 = new Date(finishDate);
    d1.setHours(0);
    d1.setMinutes(0);
    d1.setSeconds(0);
    d2.setHours(23);
    d2.setMinutes(59);
    d2.setSeconds(59);
    var q= {
      status:1,
      type:type,
      date:{"$gte": new Date(d1), "$lte": new Date(d2)}
    };
    if(school!= -1){
      q.school=school
    }
    if(cat !== "all"){
      q.inOutcomeType=cat;
    }
    model.InOutcome.count(q,function(err, count){
      model.InOutcome.find(q).limit(limit).skip(page*limit).populate('inOutcomeType').exec(function(err,InOutcomes){
        if(!err){
          cb({result:InOutcomes,count:count});
        }else{
          cb(null);
        }
      });
    });

  },

  getInOutcomeId :function(id,cb){
    model.InOutcome.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addInOutcome : function(body,cb){
    var obj = body;
    obj.date = new Date();
    var InOutcome = new model.InOutcome(obj);
    InOutcome.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  updateInOutcome : function(id,body,cb){
    var obj = body;
    model.InOutcome.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  deleteInOutcome : function(id,cb){
    model.InOutcome.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  }

};
