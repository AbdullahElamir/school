var model = require('../models');
var Vaccination = null;

module.exports = {

  getAllVaccination :function(cb){
    model.Vaccination.find({status:1}, function(err, Vaccinations){
      if(!err){
        cb(Vaccinations);
      }else{
        // console.log(err);
        cb(null);
      }
    });
  },

  //getAllVaccinationsBySearchValue
  getAllVaccinationsBySearchValue :function(searchValue,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Vaccination.count({name:new RegExp(searchValue, 'i')},function(err, count){
      model.Vaccination.find({name:new RegExp(searchValue, 'i')}).limit(limit).skip(page*limit).exec(function(err,Vaccinations){
        if(!err){
          cb({result:Vaccinations,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  //getAllVaccinationsCount
  getAllVaccinationCount :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.Vaccination.count({},function(err, count){
      model.Vaccination.find({}).limit(limit).skip(page*limit).exec(function(err,Vaccinations){
        if(!err){
          cb({result:Vaccinations,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },

  getVaccinationId :function(id,cb){
    model.Vaccination.findOne({_id : id}, function(err, custom){
      if(!err){
        cb(custom);
      }else{
        cb(null);
      }
    });
  },

  addVaccination : function(body,cb){
    var obj =body;
    obj.date = new Date();
    Vaccination = new model.Vaccination(obj);
    Vaccination.save(function(err,result){
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  updateVaccination : function(id,body,cb){
    var obj = body;
    model.Vaccination.findOneAndUpdate({_id:id}, obj, function(err,result) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },

  deleteVaccination : function(id,cb){
    model.Vaccination.remove({_id:id}, function(err,result) {
      if (!err) {
        cb(2);
      } else {
        // console.log(err);
        cb(3);
      }
    });
  }

};
