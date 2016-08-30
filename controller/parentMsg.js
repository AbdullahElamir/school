var model = require('../models');
var ParentMsg1 = null;

module.exports = {

  getAllParentMsg :function(cb){
    model.ParentMsg.find({status:1}).populate('parent').populate('msg').exec(function(err, ParentMsges){
      if(!err){
        cb(ParentMsges);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllParentMsgCount
  getAllParentMsgCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.ParentMsg.count({status:1},function(err, count){
      model.ParentMsg.find({status:1}).limit(limit).populate('parent').populate('msg').skip(page*limit).exec(function(err,ParentMsges){
        if(!err){
          cb({result:ParentMsges,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllParentMsgStatus:function(status,cb){
    model.ParentMsg.find({status:status}).populate('parent').populate('msg').exec(function(err, ParentMsges){
      if(!err){
        cb(ParentMsges);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getAllParentMsgSeen:function(seen,cb){
    model.ParentMsg.find({seen:seen}).populate('parent').populate('msg').exec(function(err, ParentMsges){
      if(!err){
        cb(ParentMsges);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },

  getParentMsgId :function(id,cb){
    model.ParentMsg.findOne({_id : id,status:1}).populate('parent').populate('msg').exec(function(err, ParentMsges){
      if(!err){
        cb(ParentMsges);
      }else{
        cb(null);
      }
    });
  },
  getParentMsgParent :function(parent,cb){
    model.ParentMsg.find({parent : parent,status:1}).populate('parent').populate('msg').exec(function(err, ParentMsges){
      if(!err){
        cb(ParentMsges);
      }else{
        cb(null);
      }
    });
  },
  getParentMsgExam :function(msg,cb){
    model.ParentMsg.find({msg : msg,status:1}).populate('parent').populate('msg').exec(function(err, ParentMsges){
      if(!err){
        cb(ParentMsges);
      }else{
        cb(null);
      }
    });
  },

  getParentMsgExamSubject :function(parent,msg,cb){
    model.ParentMsg.find({parent : parent,status:1,msg:msg}).populate('parent').populate('msg').exec(function(err, ParentMsges){
      if(!err){
        cb(ParentMsges);
      }else{
        cb(null);
      }
    });
  },

  addParentMsg : function(body,cb){
    var obj =body;
    ParentMsg1 = new model.ParentMsg(obj);
    ParentMsg1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateParentMsg : function(id,body,cb){
    obj = body;
    model.ParentMsg.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  // deleteParentMsg : function(id,cb){
  //   model.ParentMsg.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });
  // }
  
};