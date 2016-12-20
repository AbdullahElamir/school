(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('reportCtl',['$scope','YearServ','toastr','ClassServ','StudentServ',function($scope,YearServ,toastr,ClassServ,StudentServ){

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.schools=[];
    $scope.total=0;
    YearServ.getAllYears().then(function(response) {
      $scope.years = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    StudentServ.getMonth().then(function(response) {
      $scope.months = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.getClass = function(){
      ClassServ.classRoomsReport($scope.year).then(function(response) {
        $scope.AllclassRooms=response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
     $scope.getstudent = function(){
      ClassServ.getStudentsInfoBySubjectAndClassRoom($scope.classRoom).then(function(response) {
        $scope.students = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.report = function(){
     window.location.href='student/report2/'+$scope.stupro+'/'+$scope.month;
    };
  }]);


}());
