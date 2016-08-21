(function(){
  'use strict';
  var app = angular.module('school');

  app.controller('SubjectsCtl',['$scope','$state','ClassServ','SubjectServ','toastr',function($scope,state,ClassServ,SubjectServ,toastr){
    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
     SubjectServ.getSubjects($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.subjects = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
   }
   $scope.init();
   $scope.deleteSubject = function(id) {
    $scope.idSubject = id;
   }
   $scope.deleteConfirm = function(id) {
    SubjectServ.deleteSubject(id).then(function(response){
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

//editSubjectCtl
  app.controller('editSubjectCtl',['$scope','$stateParams','ClassServ','SubjectServ','$state','toastr',function($scope,$stateParams,ClassServ,SubjectServ,$state,toastr){
    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.editSubjectForm={};
   
    SubjectServ.getSubjectById($stateParams).then(function(response) {
      $scope.editSubjectForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    

    $scope.editSubject = function(){
  
      SubjectServ.editSubject($stateParams.id,$scope.editSubjectForm).then(function(response) {
        if(response.data){
          $state.go('subjects');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

  }]);

  app.controller('newSubjectCtl',['$scope','ClassServ','SubjectServ','$state','toastr',function($scope,ClassServ,SubjectServ,$state,toastr){
    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.newSubjectForm={};

    $scope.newSubject = function(){
      SubjectServ.addSubject($scope.newSubjectForm).then(function(response){
        if(response.data){
          $state.go('subjects');
          toastr.success('تم الإضافة بنجاح');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
        
    }

  }]);

}());