(function(){
  'use strict';
  var app = angular.module('adminSchool');

   app.controller('newClassRoomCtl',['$scope','$state','YearServ','RoomServ','ClassServ','ParentServ','toastr',function($scope,$state,YearServ,RoomServ,ClassServ,ParentServ,toastr){
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

    RoomServ.getAllRooms().then(function(response){
      $scope.allRooms = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.newClassRoomForm= {};
    $scope.newClassRooms = function(){
      console.log($scope.newClassRoomForm);


    }







   }]);







  }());