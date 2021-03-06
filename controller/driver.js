var model = require("../models");
var driver = null;

module.exports = {

  getAllDrivers :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Driver.find(q,function(err, drivers){
      if(!err){
        cb(drivers);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllDriversBySearchValue
  getAllDriversBySearchValue :function(school,searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1,
      $or :[
        {name:new RegExp(searchValue, 'i')},
        {nid:new RegExp(searchValue, 'i')}
      ]
    };
    if(school!= -1){
      q.school=school
    }
    model.Driver.count(q,function(err, count){
      model.Driver.find(q).limit(limit).skip(page*limit).exec(function(err,drivers){
        if(!err){
          cb({result:drivers,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllDriversCount
  getAllDriversCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Driver.count(q,function(err, count){
      model.Driver.find(q).limit(limit).skip(page*limit).exec(function(err,drivers){
        if(!err){
          cb({result:drivers,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllDriversStatus:function(status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Driver.find(q,function(err, drivers){
      if(!err){
        cb(drivers);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getDriverName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.Driver.find(q).limit(30).exec(function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  getDriverId :function(id,cb){
    model.Driver.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addDriver : function(body,cb){
    var obj = body;
    driver = new model.Driver(obj);
    driver.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateDriver : function(id,body,cb){
    var obj = body;
    model.Driver.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteDriver : function(id,cb){
    //a function is called to delete
    var deleteFun= function(){
      model.Driver.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["TransferProcess"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        model[collections.pop()].find({driver:id},function(err,result){
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
