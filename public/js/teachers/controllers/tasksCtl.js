(function(){
  'use strict';
  var app = angular.module('teachersSchool');
  app.controller('TasksCtl',['$scope','$state','$stateParams','TasksServ','toastr',function($scope,state,$stateParams,TasksServ,toastr){
    var userId = "57b86e8d83fe2ca53438ac35";
    $scope.subjectID = $stateParams.course;
    $scope.classRoomID = $stateParams.id;

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.tasks=[];
    $scope.total=0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      TasksServ.getTasksBySearchValue(searchValue,$scope.pageSize,$scope.currentPage,$scope.classRoomID,$scope.subjectID).then(function(response) {
        $scope.tasks = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getTasksBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.preTask = function(task) {
      $scope.idTasks = task._id;
      $scope.editTasksForm = angular.copy(task);
    };

    $scope.deleteConfirm = function(id) {
      TasksServ.deleteTasks(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue);
          var count = $scope.tasks.filter(function(obj){return obj._id != id;}).length;
          if( $scope.currentPage > 1 && count === 0 ){
            $scope.currentPage -= 1;
            $scope.init($scope.searchValue);
          }
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

    $scope.editTask = function(){
      TasksServ.editTasks($scope.idTasks,$scope.editTasksForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $scope.getTasksBySearchValue($scope.searchValue);
          $('#editTaskModal').modal('hide');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.newTask = function(){
      $scope.newTasksForm.teacher = userId;
      $scope.newTasksForm.subject = $scope.subjectID;
      $scope.newTasksForm.classRoom = $scope.classRoomID;
      TasksServ.addTasks($scope.newTasksForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $scope.getTasksBySearchValue($scope.searchValue);
          $('#newTaskModal').modal('hide');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
