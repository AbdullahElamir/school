(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('ClassRoomResultsCtl',['$scope','$state','$stateParams','ClassRoomsServ','toastr',function($scope,state,$stateParams,ClassRoomsServ,toastr){

    $scope.students=[];

    $scope.year = $stateParams.year;
    $scope.id = $stateParams.id;

    $scope.status=[
      "ناجح من الدور الاول",
      "ناجح من الدور الثاني",
      "راسب"
    ];

   $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ClassRoomsServ.getStudentsBySearchValue(searchValue,$scope.id,$scope.year).then(function(response) {
        $scope.students = response.data;
        console.log(response.data);
      }, function(response) {
        console.log("Something went wrong");
      });
     };
     $scope.init("");

    $scope.getStudentsBySearchValue = function (searchValue){
      $scope.init(searchValue);
    };

   $scope.marksBefore = function(id) {
    $scope.idStudent = id;
   };

  }]);

}());
