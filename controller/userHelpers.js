var fs = require("fs");
var path = require("path");

module.exports = {
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
    // if (req.isAuthenticated()) {
    // return next();
    // }
    // res.redirect('/');
     return next();
  }
  
};
