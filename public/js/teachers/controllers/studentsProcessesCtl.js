(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('StudentsProcessesCtl',['$scope','studentsProcessesServ','ClassRoomServ','toastr',function($scope,studentsProcessesServ,ClassRoomServ,toastr){
    // id of teacher
    var id ='580653580347bd24e312108e';
    ClassRoomServ.getTeacherClassRooms(id).then(function(response){
      $scope.classRooms = response.data;
    },function(response){
      console.log("Something went wrong");
    });

    $scope.openSendMessageDialog = function(id) {
      $scope.idClassRoom = id;
    };

    $scope.sendMessageToParentsOfClassRoom = function(){
      ClassRoomServ.sendMessageToParentsOfClassRoom($scope.idClassRoom,$scope.message).then(function(response){
        if(response.data === true){
          $scope.message.title = "";
          $scope.message.description = "";
          $('#messageModal').modal('hide');
          toastr.success('تم إرسال الرسالة إلى جميع أولياء طلبة المجموعة بنجاح');
        }
      },function(response) {
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
