var model = require('../models');
var Clothes1 = null;
module.exports = {

  getAllClothes :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Clothes.find(q, function(err, Clothes){
      if(!err){
        cb(Clothes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllClothesBySearchValue
  getAllClothesBySearchValue :function(school,searchValue,limit,page,cb){
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
    model.Clothes.count(q,function(err, count){
      model.Clothes.find(q).limit(limit).skip(page*limit).exec(function(err,Clothes){
        if(!err){
          cb({result:Clothes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllClothesCount
  getAllClothesCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Clothes.count(q,function(err, count){
      model.Clothes.find(q).limit(limit).skip(page*limit).exec(function(err,Clothes){
        if(!err){
          cb({result:Clothes,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllClothesStatus:function(school,status,cb){
    var q= {
      status:status
    };
    if(school!= -1){
      q.school=school
    }
    model.Clothes.find(q,function(err, clothes){
      if(!err){
        cb(clothes);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  getClothesName :function(school,name,cb){
    var q= {
      status:1,
      name :{ $regex:name, $options: 'i' }
    };
    if(school!= -1){
      q.school=school
    }
    model.Clothes.find(q).limit(30).exec(function(err, name){
      if(!err){
        cb(name);
      }else{
        cb(null);
      }
    });
  },

  getClothesId :function(id,cb){
    model.Clothes.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addClothes : function(body,cb){
    var obj =body;
    Clothes1 = new model.Clothes(obj);
    Clothes1.save(function(err){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateClothes : function(id,body,cb){
    var obj = body;
    model.Clothes.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteClothes : function(id,cb){
    //a function is called to delete
    var deleteFun= function(){
      model.Clothes.remove({_id:id}, function(err) {
        if (!err) {
          cb(2);
        } else {
          cb(3);
        }
      });
    };
    //collections must be checked before delete
    var collections = ["Request"];
    //recursive function to check all the collections provided in the array
    var check = function(){
      if(collections.length>0){
        //pop an element from the array and check it
        model[collections.pop()].find({clothes:id},function(err,result){
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
