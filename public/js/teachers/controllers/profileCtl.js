(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('ProfileCtl',['$scope','$state','TeacherServ','toastr',function($scope,state,TeacherServ,toastr){
    var userId = "580653580347bd24e312108e";

    TeacherServ.getTeacherById({id:userId}).then(function(response) {
     response.data.birth_day=new Date(response.data.birth_day);
     response.data.password="";
      $scope.user = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.changePassFun = function(){
      TeacherServ.changePass(userId,$scope.changePass).then(function(response){
        if(response.data.result == 1){
          toastr.success("تم تغيير كلمة المرور بنجاح");
          $('#changePassModal').modal('hide');
        }else if(response.data.result == 2){
          toastr.error("كلمة المرور غير صحيحة");
        }else if(response.data.result == 3){
          console.log("Something went wrong");
        }else if(response.data.result == 4){
          toastr.error("كلمتا المرور غير متطابقتان");
        }
      },function(err){
        console.log("Something went wrong");
      });
    };
  }]);

  app.controller('EditProfileCtl',['$scope','$state','TeacherServ','toastr',function($scope,$state,TeacherServ,toastr){
    var userId = "580653580347bd24e312108e";

    TeacherServ.getTeacherById({id:userId}).then(function(response) {
     response.data.birth_day=new Date(response.data.birth_day);
     delete response.data.password;
      $scope.editTeacherForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editTeacher = function(){
     TeacherServ.editTeacher(userId,$scope.editTeacherForm).then(function(response) {
       if(response.data){
         toastr.info('تم التعديل بنجاح');
         $state.go('profile');
       } else {
         console.log(response.data);
       }
     }, function(response) {
       console.log("Something went wrong");
     });
   };
  }]);

}());
