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

  getNewOrder :function(school,cb){
    model.Order.find({school: school ,details: {$elemMatch: {status:"SENDING"}}}).populate("student").exec(function(err, result){
      if(!err){
        cb(result);
      }else{
        cb(null);
      }
    });
  }

};

