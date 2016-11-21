var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  easyPbkdf2 = require("easy-pbkdf2")();
var teacherMgr = require("./teacher");
var parentMgr = require("./parent");
var adminMgr = require("./admin");


//read the passport api docs if you wanna know what this does
passport.use('local',new LocalStrategy(
  function (username, password, done) {
    findByUserNameA(username, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      authenticate(user, password, function (valid) {
        if (valid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));

passport.use('parent',new LocalStrategy(
  function (username, password, done) {
    findByUserNameP(username, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      authenticate(user, password, function (valid) {
        if (valid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));
//read the passport api docs if you wanna know what this does
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//read the passport api docs if you wanna know what this does
passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = function (router) {
  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if (err) { return next(err); }
      if (!user) { return res.send({login: 2 }); }
      
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        req.session.school=req.user.school;
        if (user.level==1){
          return res.send({login: true,admin:1 });
        }else if (user.level==2){
          return res.send({login: true,admin:2 });
        }else if (user.level==7){
          return res.send({login: true,admin:7 });  
        }
        
      });
    })(req, res, next);
  });

  router.post('/loginParent', function(req, res, next) {
    passport.authenticate('parent', function(err, user) {
      if (err) { return next(err); }
      if (!user) { return res.send({message: 'خطا في اسم المستخدم او كلمة المرور',hasFailed:true }); }
      
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        if (user){
          return res.send({message:'',hasFailed:false,person:{
            type:'PARENT',
            _id:user._id,
            name:user.name,
            school_id:school
          } });
        }
        
      });
    })(req, res, next);
  });

  // here if a user wants to logout of the app
  router.get('/logout', ensureAuthenticated, function (req, res) {
    req.session.destroy();
    res.redirect('/');
  });
  return router;
}

function findById(id, fn) {
  adminMgr.getAdminId(id,function(user){
    if (user) {
      fn(null, user);
    } else {
      teacherMgr.getTeacherId(id,function(user){
        if (user) {
          fn(null, user);
        } else {
          parentMgr.getParentId(id,function(user){
            if (user) {
              fn(null, user);
            } else {
              fn(new Error('User ' + id + ' does not exist'));
            }
          });
        }
      });
    }
  });
  

}

function findByUserNameA(username, fn) {
  adminMgr.getAdminEmail(username,function(user){
    if(user){
      fn(null, user);
    }else{
      teacherMgr.getTeacherEmail(username,function(user){
        if (user) {
          fn(null, user);
        } else {
          return fn(null, null);
        }
      });
    }
    
  });

}
function findByUserNameP(username, fn) {
  parentMgr.getParentEmail(username,function(user){
    if (user) {
      fn(null, user);
    } else {
      return fn(null, null);
    }
  });


}
function authenticate(user, userEnteredPassword, callback) {
  // make sure the user-entered password is equal to the previously
  // created hash when hashed with the same salt.
  easyPbkdf2.verify(user.salt, user.password, userEnteredPassword, function (err, valid) {
    if (err) {
      // console.log(err);
    } else {
      callback(valid);
    }
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}
