(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('StudentInformationCtl',['$scope','studentInformationServ',function($scope){
    $scope.studentinformtion={};
    //get student info

    studentInformationServ.getStudentsInfo().then(function(response){
      console.log(response.data);
      $scope.studentinformtion=response.data;
    },function(err){
      console.log("Something went wrong");

    });
  console.log("ok");

  }]);

}());