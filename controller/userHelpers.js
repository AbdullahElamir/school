var fs = require("fs");
var path = require("path");
var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")();
module.exports = {
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
    // if (req.isAuthenticated()) {
    // return next();
    // }
    // res.redirect('/');
     return next();
  },
  Hash : function(password,cb){
    var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
    easyPbkdf2.secureHash( password, salt, function( err, passwordHash, originalSalt ) {
      cb({password:passwordHash,salt:originalSalt});
    });
  }
};
