(function(){
  'use strict';
  var app = angular.module('school');
  app.controller('YearsCtl',['$scope','$state','YearServ','toastr',function($scope,state,YearServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.years=[];
    $scope.total=0;
   $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      YearServ.getYearsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.years = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
     };
     $scope.init("");
     
    $scope.getYearsBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };
   
   // $scope.deleteYear = function(id) {
   //  $scope.idYear = id;
   // };
   
   // $scope.deleteConfirm = function(id) {
   //  YearServ.deleteYear(id).then(function(response){
   //      if(response.data.result == 1){
   //        toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
   //      } else if (response.data.result == 2){
   
   //        $('#myModal').modal('hide');
   //        toastr.success('تم الحذف بنجاح');
          
   //        $scope.init($scope.searchValue);
   //        var count = $scope.years.filter(function(obj){return obj._id != id;}).length;
   //        if( $scope.currentPage > 1 && count == 0 ){
   //          $scope.currentPage -= 1;
   //          $scope.init($scope.searchValue);
   //        }
          
   //      } else if (response.data.result == 3){
   //        toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
   //      }

   //  },function(response){
   //    console.log("Somthing went wrong");
   //  });
   // };

  }]);

  app.controller('editYearCtl',['$scope','$stateParams','YearServ','$state','toastr',function($scope,$stateParams,YearServ,$state,toastr){
    $scope.editYearForm={};
   
    YearServ.getYearById($stateParams).then(function(response) {
      $scope.editYearForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    

    $scope.editYear = function(){
  
      YearServ.editYear($stateParams.id,$scope.editYearForm).then(function(response) {
        if(response.data){
          $state.go('years');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  app.controller('newYearCtl',['$scope','YearServ','$state','toastr',function($scope,YearServ,$state,toastr){
    
    $scope.newYearForm={};
    $scope.newYear = function(){
      YearServ.addYear($scope.newYearForm).then(function(response){
        if(response.data){
          $state.go('years');
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