(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('ProfileCtl',['$scope','$state','AdminServ','toastr',function($scope,state,AdminServ,toastr){
    var userId = "57e275243ae2eb38516c6da8";
    
    AdminServ.getAdminById({id:userId}).then(function(response) {
     response.data.birth_day=new Date(response.data.birth_day);
     response.data.password="";
      $scope.user = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
  }]);

}());
