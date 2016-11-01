(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.directive('showtab',function () {
    return {
      link: function (scope, element, attrs) {
        element.click(function(e) {
          e.preventDefault();
          $(element).tab('show');
        });
      }
    };
  });

  app.controller('ClassRoomResultsCtl',['$scope','$state','$stateParams','ClassRoomsServ','toastr',function($scope,state,$stateParams,ClassRoomsServ,toastr){

    $scope.students=[];

    $scope.year = $stateParams.year;
    $scope.id = $stateParams.id;

    $scope.status=[
      "ناجح من الدور الاول",
      "ناجح من الدور الثاني",
      "راسب"
    ];

    ClassRoomsServ.getStudentsResults($scope.id,$scope.year).then(function(response) {
      $scope.students = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });


    $scope.calculateAvg = function(semester) {
      var type2 = {};
      var i;

      for(i=0 ; i<$scope.examsGrades.length ; i++ ){
        if( $scope.examsGrades[i].semester == semester && $scope.examsGrades[i].type == 2 ){
          type2 = $scope.examsGrades[i];
        }
      }

      var sum = 0.0 , count=0;

      for(i=0 ; i<$scope.examsGrades.length ; i++ ){
        if( $scope.examsGrades[i].semester == semester && $scope.examsGrades[i].type == 1 ){
          count++;
          sum += ($scope.examsGrades[i].studentMark/$scope.examsGrades[i].mark)*(type2.mark);
        }
      }

      for(i=0 ; i<$scope.examsGrades.length ; i++ ){
        if( $scope.examsGrades[i].semester == semester && $scope.examsGrades[i].type == 2 ){
          $scope.examsGrades[i].studentMark = sum/count;
        }
      }
    };

   $scope.marksBefore = function(id) {
    $scope.idStudent = id;
    ClassRoomsServ.getStudentMarks(id,$scope.id).then(function(response) {
      console.log(response.data);
      $scope.subjects = response.data;
    }, function(err) {
      console.log("Something went wrong");
    });
   };

  }]);

}());
