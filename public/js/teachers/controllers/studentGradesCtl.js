(function(){
  'use strict';
  var app = angular.module('school');

  app.controller('StudentGradesCtl',['$scope','studentGradesServ',function($scope,studentsProcessesServ){
    // $scope.studentProcesses={};
    // //get student info

    // studentsProcessesServ.getStudentsInfo().then(function(response){
    //   console.log(response.data);
    //   $scope.studentProcesses=response.data;
    // },function(err){
    //   console.log("Something went wrong");

    // });
  console.log("ok");

  }]);

}());