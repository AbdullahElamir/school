
var model = require("../models");

module.exports = {
  getSchoolInfo :function(cb){
    var info = {
      name:"مدرسة التوفيق للتعليم الحر",
      address:"حي الاندلس شارع البريد بالقرب من المستوصف الصحي",
      phone:"0928935974",
      des:"مدرسة التوفيق للتعليم الحر في مختلف المستويات نطمح دائما لنكون الافضل كن مطمئنا بوجود ابنائك برفقة طاقم مدرسة التوفيق"
    };
    cb(info);
  },

  updateSchool : function(body,cb){
    cb(true);
  },
};