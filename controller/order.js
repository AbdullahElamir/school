var model = require('../models');

module.exports = {

  addOrder :function(data,cb){
    model.Order.findOne({student : data.student}, function(err, result){
      if (!err) {
        if(result){
          result.details.push(data.details[0]);
          model.Order.findOneAndUpdate({student : data.student}, {details:result.details}, function(err,result1) {
            cb(result1);
          });

        }else{
          order = new model.Order(data);
          order.save(function(err){
            if (!err) {
              cb(true);
            } else {
              cb(false);
            }
          });  
        }
      }else{
        cb(false);
      }
    });
  },

  getAllOrder :function(status,limit,page,school,cb){
    console.log(school);
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Order.count({school: school ,details: {$elemMatch: {status:status}}} ,function(err,count){
      model.Order.find({school: school,details: {$elemMatch: {status:status}}}).populate("student").limit(limit).skip(page*limit).exec(function(err, result){
        if(!err){
          cb({result:result,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  getOrderById :function(id,cb){
    model.Order.find({student:id})
    .populate("school")
    .exec(function(err, result){
      if(!err){
        cb(result);
      }else{
        cb(null);
      }
    });
  },
  changeStatus: function(body,school,cb){
    model.Order.findOneAndUpdate({school: school ,details: {$elemMatch: {_id:body.id}}},{ $set: {"details.$.status": body.statu}},function(err,result){
      if(!err){
        cb(result);
      }else{
        cb(null);
      }
    });
  }


};

