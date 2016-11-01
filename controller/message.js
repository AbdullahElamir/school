var model = require('../models');
var Message = null;

module.exports = {

  getAllMessage :function(cb){
    model.Message.find({status:1}, function(err, Messages){
      if(!err){
        cb(Messages);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllMessagesBySearchValue
  getAllMessagesBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Message.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Message.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Messages){
        if(!err){
          cb({result:Messages,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllMessagesCount
  getAllMessageCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Message.count({},function(err, count){
      model.Message.find({}).limit(limit).skip(page*limit).exec(function(err,Messages){
        if(!err){
          cb({result:Messages,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllMessageStatus:function(status,cb){
    model.Message.find({status:status},function(err, classes){
      if(!err){
        cb(classes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },
  
  getMessageName :function(name,cb){
    model.Message.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getMessageId :function(id,cb){
    model.Message.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addMessage : function(body,cb){
    var obj =body;
    Message = new model.Message(obj);
    Message.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateMessage : function(id,body,cb){
    var obj = body;
    model.Message.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  addMsgParent : function(body,cb){
    var obj ={
      name:body.title,
      msg:body.description
    };
    Message = new model.Message(obj);
    Message.save(function(err,result){
      if (!err) {
        cb(result);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  }
  
  // deleteMessage : function(id,cb){
  //   model.Message.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }
  
};