var model = require("../models");
var committee = null;

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
  
  //getAllDriversCount
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
    model.Committee.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }
  
};