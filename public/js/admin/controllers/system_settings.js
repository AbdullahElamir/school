(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('system_settings',['$scope','$state','SystemServ','YearServ','toastr',function($scope,state,SystemServ,YearServ,toastr){
    $scope.systemCounter = 1;
    $scope.systems = [{'number':$scope.systemCounter}];
    $scope.addSystemRow = function(){
      $scope.systems.push({'number': $scope.systemCounter+=1});
    };
    $scope.deleteSystemRow = function(index){
      $scope.systems.splice(index, 1);
    };
    SystemServ.getAllSystem().then(function(response){
      $scope.allSystem = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });
    YearServ.getAllYears().then(function(response){
      $scope.allYear = response.data
    },function(response){
      console.log("Somthing went wrong");
    });
  }]);
}());