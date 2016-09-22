var model = require('../models');

module.exports = {

  getAllClothes :function(cb){
    model.Clothes.find({}, function(err, Clothes){
      if(!err){
        cb(Clothes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  //getAllClothesBySearchValue
  getAllClothesBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Clothes.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Clothes.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Clothes){
        if(!err){
          cb({result:Clothes,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllClothesCount
  getAllClothesCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Clothes.count({},function(err, count){
      model.Clothes.find({}).limit(limit).skip(page*limit).exec(function(err,Clothes){
        if(!err){
          cb({result:Clothes,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getAllClothesStatus:function(status,cb){
    model.Clothes.find({status:status},function(err, clothes){
      if(!err){
        cb(clothes);
      }else{
        console.log(err);
        cb(null);
      }
    });
  },
  
  getClothesName :function(name,cb){
    model.Clothes.find({name :{ $regex:name, $options: 'i' }}).limit(30).exec(function(err, name){
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
    Clothes1.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },

  updateClothes : function(id,body,cb){
    obj = body;
    model.Clothes.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        console.log(err);
        cb(false);
      }
    });
  },
  
  deleteClothes : function(id,cb){
    model.Clothes.remove({_id:id}, function(err,result) {
      if (!err) {
        cb({result : 2});
      } else {
        console.log(err);
        cb({result : 3});
      }
    });
  }
  
};