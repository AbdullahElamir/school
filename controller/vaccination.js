var model = require('../models');
var Vaccination = null;

module.exports = {

  getAllVaccination :function(school,cb){
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Vaccination.find(q, function(err, Vaccinations){
      if(!err){
        cb(Vaccinations);
      }else{
        cb(null);
      }
    });
  },
  getAllVaccinationStudent :function(id,cb){
    model.StdVaccination.find({status:1,student:id}).populate("vaccination").exec(function(err, Vaccinations){
      if(!err){
        cb(Vaccinations);
      }else{
        cb(null);
      }
    });
  },
  setStudentVaccination :function(StdVaccination,cb){
    var stdV = new model.StdVaccination(StdVaccination);
    stdV.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  //getAllVaccinationsBySearchValue
  getAllVaccinationsBySearchValue :function(school,searchValue,limit,page,cb){
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
    model.Vaccination.count(q,function(err, count){
      model.Vaccination.find(q).limit(limit).skip(page*limit).exec(function(err,Vaccinations){
        if(!err){
          cb({result:Vaccinations,count:count});
        }else{
          cb(null);
        }
      });
    });
  },

  //getAllVaccinationsCount
  getAllVaccinationCount :function(school,limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {
      status:1
    };
    if(school!= -1){
      q.school=school
    }
    model.Vaccination.count(q,function(err, count){
      model.Vaccination.find(q).limit(limit).skip(page*limit).exec(function(err,Vaccinations){
        if(!err){
          cb({result:Vaccinations,count:count});
        }else{
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
    Vaccination.save(function(err){
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  updateVaccination : function(id,body,cb){
    var obj = body;
    model.Vaccination.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },
  updateStudentVaccination : function(id,body,cb){
    var obj = body;
    model.StdVaccination.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  },

  deleteVaccination : function(id,cb){
    model.Vaccination.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  },

  deleteStudentVaccination : function(id,cb){
    model.StdVaccination.remove({_id:id}, function(err) {
      if (!err) {
        cb(2);
      } else {
        cb(3);
      }
    });
  }

};
