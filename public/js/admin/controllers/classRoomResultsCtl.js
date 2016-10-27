(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('ClassRoomResultsCtl',['$scope','$state','ClassRoomsServ','toastr',function($scope,state,ClassRoomsServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.students=[];
    $scope.total=0;

    $scope.status=[
      "ناجح من الدور الاول",
      "ناجح من الدور الثاني",
      "راسب"
    ];

   $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ClassRoomsServ.getStudentsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.students = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
     };
     $scope.init("");

    $scope.getStudentsBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

   $scope.marksBefore = function(id) {
    $scope.idStudent = id;
   };

  }]);

}());
