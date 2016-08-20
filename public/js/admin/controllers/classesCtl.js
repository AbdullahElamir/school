(function(){
  'use strict';
  var app = angular.module('school');

  app.controller('ClassesCtl',['$scope','$state','ClassServ','toastr',function($scope,state,ClassServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
     ClassServ.getClasses($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.classes = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
   }
   $scope.init();
   $scope.deleteClass = function(id) {
    $scope.idClass = id;
   }
   $scope.deleteConfirm = function(id) {
    ClassServ.deleteClass(id).then(function(response){
      if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليه');
        } else if (response.data.result == 2){
   
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init();
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }

    },function(response){
      console.log("Somthing went wrong");
    });
   }

  }]);

//editClassCtl
  app.controller('editClassCtl',['$scope','$stateParams','ClassServ','$state','toastr',function($scope,$stateParams,ClassServ,$state,toastr){
    $scope.editClassForm={};
   
    ClassServ.getClassById($stateParams).then(function(response) {
      $scope.editClassForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    

    $scope.editClass = function(){
  
      ClassServ.editClass($stateParams.id,$scope.editClassForm).then(function(response) {
        if(response.data){
          $state.go('classes');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

  }]);

  app.controller('newClassCtl',['$scope','ClassServ','$state','toastr',function($scope,ClassServ,$state,toastr){
    
    $scope.newClassForm={};
    $scope.newClass = function(){
      ClassServ.addClass($scope.newClassForm).then(function(response){
        if(response.data){
          $state.go('classes');
          toastr.success('تم الإضافة بنجاح');
        } else {
          console.log($scope.newClassForm);
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
        
    }

  }]);

}());