(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('ClothesCtl',['$scope','$state','ClothesServ','toastr',function($scope,state,ClothesServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.clothes=[];
    $scope.total=0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ClothesServ.getClothesBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.clothes = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getClothesBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.deleteClothes = function(id) {
      $scope.idClothes = id;
    };

    $scope.deleteConfirm = function(id) {
      ClothesServ.deleteClothes(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          
          var count = $scope.clothes.length;
          if( $scope.currentPage > 1 && count === 1 ){
            $scope.currentPage -= 1;
          }
          $scope.init($scope.searchValue);
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

  app.controller('editClothesCtl',['$scope','$stateParams','ClothesServ','$state','toastr',function($scope,$stateParams,ClothesServ,$state,toastr){

    $scope.editClothesForm={};
    ClothesServ.getClothesById($stateParams).then(function(response) {
      $scope.editClothesForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editClothes = function(){
      ClothesServ.editClothes($stateParams.id,$scope.editClothesForm).then(function(response) {
        if(response.data){
          $state.go('clothes');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  app.controller('newClothesCtl',['$scope','ClothesServ','$state','toastr',function($scope,ClothesServ,$state,toastr){

    $scope.newClothesForm={};
    $scope.newClothes = function(){
      ClothesServ.addClothes($scope.newClothesForm).then(function(response){
        if(response.data){
          $('#clothesId').click();
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
