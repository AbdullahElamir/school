(function(){
  'use strict';
  var app = angular.module('adminSchool');

   app.controller('newClassRoomCtl',['$scope','$state','YearServ','ClassServ','ParentServ','toastr',function($scope,$state,YearServ,ClassServ,ParentServ,toastr){
    YearServ.getAllYears().then(function(response){
      $scope.allYears = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    ClassServ.getAllClasses().then(function(response){
      $scope.allClasses = response.data;

    },function(response){
      console.log("Somthing went wrong");
    });





   }]);







  }());