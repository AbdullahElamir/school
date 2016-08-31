(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('StudentsProcessesCtl',['$scope','studentsProcessesServ','ClassServ',function($scope,studentsProcessesServ,ClassServ){
    // get class info 
    ClassServ.getAllClasses().then(function(response){
      console.log(response.data);
      $scope.allClasses = response.data;
    },function(response){

    });


    /*$scope.studentProcesses={};*/
    //get student info


  /*  studentsProcessesServ.getInfo().then(function(response){
      console.log(response.data);
      $scope.studentProcesses=response.data;
    },function(err){
      console.log("Something went wrong");

    });
*/
  }]);

}());