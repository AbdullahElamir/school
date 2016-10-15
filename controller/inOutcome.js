var model = require('../models');
var inOutcome = null;

module.exports = {

  //getAllInOutcomesBySearchValue
  getAllInOutcomesBySearchValue :function(cat,type,searchValue,limit,page,startDate,finishDate,cb){
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
    if(cat === "all"){
      model.InOutcome.count({title:new RegExp(searchValue, 'i'),type:type,date:{"$gte": new Date(d1), "$lte": new Date(d2)}},function(err, count){
        model.InOutcome.find({title:new RegExp(searchValue, 'i'),type:type,date:{"$gte": new Date(d1), "$lte": new Date(d2)}}).limit(limit).skip(page*limit).populate('inOutcomeType').exec(function(err,InOutcomes){
          if(!err){
            cb({result:InOutcomes,count:count});
          }else{
            console.log(err);
            cb(null);
          }
        });
      });
    }else{
      model.InOutcome.count({title:new RegExp(searchValue, 'i'),inOutcomeType:cat,type:type,date:{"$gte": new Date(d1), "$lte": new Date(d2)}},function(err, count){
        model.InOutcome.find({title:new RegExp(searchValue, 'i'),inOutcomeType:cat,type:type,date:{"$gte": new Date(d1), "$lte": new Date(d2)}}).limit(limit).skip(page*limit).populate('inOutcomeType').exec(function(err,InOutcomes){
          if(!err){
            cb({result:InOutcomes,count:count});
          }else{
            console.log(err);
            cb(null);
          }
        });
      });
    }
  },

  //getAllInOutcomesCount
  getAllInOutcomeCount :function(cat,type,limit,page,startDate,finishDate,cb){
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
    console.log(d1);
    console.log(d2);
    if(cat === "all"){
      model.InOutcome.count({type:type,date:{"$gte": new Date(d1), "$lte": new Date(d2)}},function(err, count){
        model.InOutcome.find({type:type,date:{"$gte": new Date(d1), "$lte": new Date(d2)}}).limit(limit).skip(page*limit).populate('inOutcomeType').exec(function(err,InOutcomes){
          if(!err){
            cb({result:InOutcomes,count:count});
          }else{
            console.log(err);
            cb(null);
          }
        });
      });
    }else{
      model.InOutcome.count({type:type,inOutcomeType:cat,date:{"$gte": new Date(d1), "$lte": new Date(d2)}},function(err, count){
        model.InOutcome.find({type:type,inOutcomeType:cat,date:{"$gte": new Date(d1), "$lte": new Date(d2)}}).limit(limit).skip(page*limit).populate('inOutcomeType').exec(function(err,InOutcomes){
          if(!err){
            cb({result:InOutcomes,count:count});
          }else{
            console.log(err);
            cb(null);
          }
        });
      });
    }
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
    var obj =body;
    obj.date = new Date();
    InOutcome = new model.InOutcome(obj);
    InOutcome.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateInOutcome : function(id,body,cb){
    obj = body;
    model.InOutcome.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  deleteInOutcome : function(id,cb){
    model.InOutcome.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        console.log(err);
        cb(3);
      }
    });
  }

};
