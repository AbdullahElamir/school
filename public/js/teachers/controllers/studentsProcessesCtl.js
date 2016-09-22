(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('StudentsProcessesCtl',['$scope','studentsProcessesServ','ClassRoomServ',function($scope,studentsProcessesServ,ClassRoomServ){
    // id of teacher
    var id =1;
    ClassRoomServ.getTeacherClassRooms(id).then(function(response){
      $scope.classRooms = response.data;
    },function(response){
      console.log("Something went wrong");
    });

  }]);

}());
