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

  getClothesId :function(school,id,cb){
    model.Clothes.findOne({ school: school},{stock: {$elemMatch: {_id: id}}},function(err, clothes){
      if(!err){
        cb(clothes);
      }else{
        cb(null);
      }
    });
  },

  getStock1 :function(school,cb){
    model.Clothes.findOne({ school: school},function(err, clothes){
      if(!err){
        cb(clothes.stock);
      }else{
        cb(null);
      }
    });
  },

  addClothes : function(body,cb){
    var obj = body;
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

  updateClothes : function(school,id,body,cb){
    var obj = body;
    model.Clothes.findOne({school: school},{stock: {$elemMatch: {_id:{ $ne: id}}}}, function(err, custom){
      var cLArray = custom.stock;
      cLArray.push(obj);
      model.Clothes.findOneAndUpdate({school: school},{stock:cLArray}, function(err,result) {
        console.log(result);
        if (!err) {
          cb(true);
        } else {
          cb(false);
        }
      });
    });
  },
  
  //delete stock by id 
  deleteClothes : function(school,id,cb){
    model.Clothes.findOne({school: school},{stock: {$elemMatch: {_id:{ $ne: id}}}}, function(err, custom){
      var cLArray = custom.stock;
      model.Clothes.findOneAndUpdate({school: school},{stock:cLArray}, function(err,result) {
        console.log(result);
        if (!err) {
          cb({result : 2});
        } else {
          cb({result : 3});
        }
      });
    });
  },

  // add new stock on old clothes by school
  addStockOnClothes : function(body,cb){
    var obj = body;
    var school = obj.school;
    console.log(school);
    model.Clothes.findOne({school : school}, function(err, custom){
      var cLarray = custom.stock;
      cLarray.push(obj.stock[0]);
      model.Clothes.findOneAndUpdate({school:school}, {stock:cLarray}, function(err) {
        if (!err) {
          cb(true);
        } else {
          cb(false);
        }
      });
    });
  },

  getClothesBySchoolId : function(school1,cb){
    model.Clothes.findOne({school : school1}, function(err, custom){
      console.log(custom);
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    })
  },

   // add new info on old stock by school
  addInfoOnStock : function(school,id,body,cb){
    var obj = body;
    model.Clothes.findOne({school: school},{stock: {$elemMatch: {_id:{ $ne: id}}}}, function(err, custom){
      var infOarray = custom.stock[0].info;
      infOarray.push(obj);
      console.log(infOarray);
      model.Clothes.findOneAndUpdate({school:school, stock: {$elemMatch: {_id:{ $ne: id}}}}, {info:infOarray}, function(err) {
        if (!err) {
          cb(true);
        } else {
          cb(false);
        }
      });
    });
  }

};
