(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('ProfileCtl',['$scope','$state','AdminServ','toastr',function($scope,state,AdminServ,toastr){

    AdminServ.getAdminByIdInSession().then(function(response) {
     response.data.birth_day=new Date(response.data.birth_day);
     response.data.password="";
      $scope.user = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.changePassFun = function(){
      AdminServ.changePassInSession($scope.changePass).then(function(response){
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

  app.controller('EditProfileCtl',['$scope','$state','AdminServ','toastr',function($scope,$state,AdminServ,toastr){
    
    AdminServ.getAdminByIdInSession().then(function(response) {
     response.data.birth_day=new Date(response.data.birth_day);
     delete response.data.password;
      $scope.editAdminForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editAdmin = function(){
      AdminServ.editAdminInSession($scope.editAdminForm).then(function(response) {
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
