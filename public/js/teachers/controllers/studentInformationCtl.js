(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('StudentInformationCtl',['$scope','studentInformationServ',function($scope,studentInformationServ){
    $scope.studentinformtion={};
    //get student info

    studentInformationServ.getStudentsInfo().then(function(response){
      $scope.studentinformtion=response.data;
      console.log($scope.studentinformtion);
    },function(err){
      console.log("Something went wrong");

    });
  console.log("ok");

  }]);

}());