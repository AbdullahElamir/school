(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('InOutcomeTypesCtl',['$scope','$state','InOutcomeTypesServ','toastr',function($scope,state,InOutcomeTypesServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.inOutcomeTypes=[];
    $scope.total=0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      InOutcomeTypesServ.getInOutcomeTypesBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.inOutcomeTypes = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getInOutcomeTypesBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.deleteInOutcomeTypes = function(id) {
      $scope.idInOutcomeTypes = id;
    };

    $scope.deleteConfirm = function(id) {
      InOutcomeTypesServ.deleteInOutcomeTypes(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          var count = $scope.inOutcomeTypes.length;
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

  app.controller('editInOutcomeTypesCtl',['$scope','$stateParams','InOutcomeTypesServ','$state','toastr',function($scope,$stateParams,InOutcomeTypesServ,$state,toastr){

    $scope.editInOutcomeTypesForm={};
    InOutcomeTypesServ.getInOutcomeTypesById($stateParams).then(function(response) {
      $scope.editInOutcomeTypesForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editInOutcomeTypes = function(){
      InOutcomeTypesServ.editInOutcomeTypes($stateParams.id,$scope.editInOutcomeTypesForm).then(function(response) {
        if(response.data){
          $state.go('inOutcomeTypes');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  app.controller('newInOutcomeTypesCtl',['$scope','InOutcomeTypesServ','$state','toastr','SchoolServ','AdminServ',function($scope,InOutcomeTypesServ,$state,toastr,SchoolServ,AdminServ){
    $scope.superAdminStatus;
    $scope.schools=[];
    $scope.newInOutcomeTypesForm={};
    AdminServ.getuser().then(function(response){
      $scope.superAdminStatus=response.data;
      if(response.data){
        SchoolServ.getAll().then(function(response){
          $scope.schools=response.data;
        },function(response){
          console.log("Somthing went wrong");
        });
      } 
    },function(response){
      console.log("Somthing went wrong");
    });
    $scope.newInOutcomeTypes = function(){
      InOutcomeTypesServ.addInOutcomeTypes($scope.newInOutcomeTypesForm).then(function(response){
        if(response.data){
          $('#inOutcomeTypesId').click();
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
