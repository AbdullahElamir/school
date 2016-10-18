(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('OthersCtl',['$scope','$state','$stateParams','OthersServ','SchoolServ','toastr',function($scope,state,$stateParams,OthersServ,SchoolServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.others=[];
    $scope.total=0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      OthersServ.getOthersBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.others = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getOthersBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.preOther = function(other) {
      $scope.idOthers = other._id;
      $scope.editOthersForm = angular.copy(other);
    };

    $scope.deleteConfirm = function(id) {
      OthersServ.deleteOthers(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue);
          var count = $scope.others.filter(function(obj){return obj._id != id;}).length;
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

    $scope.editOther = function(){
      OthersServ.editOthers($scope.idOthers,$scope.editOthersForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $scope.getOthersBySearchValue($scope.searchValue);
          $('#editOtherModal').modal('hide');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.newOther = function(){
      OthersServ.addOthers($scope.newOthersForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $scope.newOthersForm = {name:"",description:""};
          $scope.getOthersBySearchValue($scope.searchValue);
          $('#newOtherModal').modal('hide');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
