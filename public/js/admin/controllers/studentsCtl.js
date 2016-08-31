(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('StudentsCtl',['$scope','$state','StudentServ','toastr',function($scope,state,StudentServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      StudentServ.getStudentsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.students = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
     };
    $scope.init("");
    $scope.getStudentBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };
   $scope.deleteStudent = function(id) {
    $scope.idStudent = id;
   };
   $scope.deleteConfirm = function(id) {
    StudentServ.deleteStudent(id).then(function(response){
      if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
   
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue);
          var count = $scope.students.filter(function(obj){return obj._id != id;}).length;
          if( $scope.currentPage > 1 && count == 0 ){
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

  }]);
  //editStudentCtl
  app.controller('editStudentCtl',['$scope','$stateParams','ParentServ','StudentServ','$state','toastr',function($scope,$stateParams,ParentServ,StudentServ,$state,toastr){
    ParentServ.getAllParents().then(function(response){
      $scope.getAllParents = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.editStudentForm={};
   
    StudentServ.getStudentById($stateParams).then(function(response) {
      response.data.birth_day = new Date(response.data.birth_day);
        $scope.editStudentForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    

     $scope.editStudent = function(){
    
      StudentServ.editStudent($stateParams.id,$scope.editStudentForm).then(function(response) {
        if(response.data){
          $('#StudentsId').click();
          toastr.info('تم التعديل بنجاح');
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }; 
  }]);
  app.controller('newStudentCtl',['$scope','StudentServ','ParentServ','$state','toastr',function($scope,StudentServ,ParentServ,$state,toastr){
    ParentServ.getAllParents().then(function(response){
      $scope.getAllParents = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });
    $scope.newStudentForm={};
    $scope.newStudent = function(){
      StudentServ.addStudent($scope.newStudentForm).then(function(response){
        if(response.data){
          $('#StudentsId').click();
          toastr.success('تم الإضافة بنجاح');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });  
    };
  }]);
}());