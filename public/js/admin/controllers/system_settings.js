(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('system_settings',['$scope','$state','SystemServ','YearServ','toastr',function($scope,state,SystemServ,YearServ,toastr){

    SystemServ.getAllSystem().then(function(response){
      $scope.allSystem = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });


    YearServ.getAllYears().then(function(response){
      $scope.allYear = response.data
    },function(response){
      console.log("Somthing went wrong");
    })




  }]);


  }());