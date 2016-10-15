(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('ChecksCtl',['$scope','$state','$stateParams','ChecksServ','SchoolServ','toastr',function($scope,state,$stateParams,ChecksServ,SchoolServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.checks=[];
    $scope.total=0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ChecksServ.getChecksBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.checks = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getChecksBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.preCheck = function(check) {
      $scope.idChecks = check._id;
      $scope.editChecksForm = angular.copy(check);
    };

    $scope.deleteConfirm = function(id) {
      ChecksServ.deleteChecks(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue);
          var count = $scope.checks.filter(function(obj){return obj._id != id;}).length;
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

    SchoolServ.getAllSchool().then(function(response){
      $scope.getAllSchools = response.data;
    },function(err){
      console.log("Somthing went wrong");
    });

    $scope.editCheck = function(){
      ChecksServ.editChecks($scope.idChecks,$scope.editChecksForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $scope.getChecksBySearchValue($scope.searchValue);
          $('#editCheckModal').modal('hide');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.newCheck = function(){
      ChecksServ.addChecks($scope.newChecksForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $scope.newChecksForm = {name:"",description:""};
          $scope.getChecksBySearchValue($scope.searchValue);
          $('#newCheckModal').modal('hide');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
