//var fs = require("fs");
//var path = require("path");
//var generatePassword = require('password-generator'),

var easyPbkdf2 = require("easy-pbkdf2")();
module.exports = {
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');

    // return next();
  },
  isSuper : function (req,res,next) {
    if (req.isAuthenticated() && req.user.level==1) {
      return next();
    }
    res.redirect('/');

    // return next();
  },
  isAdmin : function (req,res,next) {
    if (req.isAuthenticated() && req.user.level<=2) {
      return next();
    }
    res.redirect('/');

    // return next();
  },
  isTeacher : function (req,res,next) {
    if (req.isAuthenticated() && req.user.level<=7) {
      return next();
    }
    res.redirect('/');

    // return next();
  },
  Hash : function(password,cb){
    var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
    easyPbkdf2.secureHash( password, salt, function( err, passwordHash, originalSalt ) {
      cb({password:passwordHash,salt:originalSalt});
    });
  }
};
