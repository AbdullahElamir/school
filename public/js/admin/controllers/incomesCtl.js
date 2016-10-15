(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('IncomesCtl',['$scope','$state','IncomesServ','InOutcomeTypesServ','toastr',function($scope,state,IncomesServ,InOutcomeTypesServ,toastr){
    $scope.startDate = $scope.finishDate = new Date();
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.incomes=[];

    $scope.getAllTypes=[];
    InOutcomeTypesServ.getAllInOutcomeTypes().then(function(response) {
      $scope.getAllTypes = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      if(!$scope.cat || $scope.cat === ""){
        $scope.cat = "all";
      }
      if($scope.startDate && $scope.finishDate){
        IncomesServ.getIncomesBySearchValue(1,$scope.cat,searchValue,$scope.startDate,$scope.finishDate,$scope.pageSize,$scope.currentPage).then(function(response) {
          $scope.incomes = response.data.result;
          $scope.total = response.data.count;
        }, function(response) {
          console.log("Something went wrong");
        });
      }
    };
    $scope.init("");

    $scope.getIncomesBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.deleteIncome = function(id) {
      $scope.idIncome = id;
    };

    $scope.deleteConfirm = function(id) {
      IncomesServ.deleteIncome(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          var count = $scope.incomes.length;
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

  app.controller('editIncomeCtl',['$scope','$stateParams','IncomesServ','InOutcomeTypesServ','$state','toastr',function($scope,$stateParams,IncomesServ,InOutcomeTypesServ,$state,toastr){

    $scope.editIncomeForm={};
    IncomesServ.getIncomeById($stateParams).then(function(response) {
      $scope.editIncomeForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.getAllTypes=[];
    InOutcomeTypesServ.getAllInOutcomeTypes().then(function(response) {
      $scope.getAllTypes = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editIncome = function(){
      IncomesServ.editIncome($stateParams.id,$scope.editIncomeForm).then(function(response) {
        if(response.data){
          $state.go('incomes');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  app.controller('newIncomeCtl',['$scope','IncomesServ','InOutcomeTypesServ','$state','toastr','AdminServ','SchoolServ',function($scope,IncomesServ,InOutcomeTypesServ,$state,toastr,AdminServ,SchoolServ){
    $scope.getAllTypes=[];
    $scope.superAdminStatus;
    $scope.schools=[];
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
    InOutcomeTypesServ.getAllInOutcomeTypes().then(function(response) {
      $scope.getAllTypes = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.newIncomeForm={};
    $scope.newIncome = function(){
      $scope.newIncomeForm.type = 1;
      IncomesServ.addIncome($scope.newIncomeForm).then(function(response){
        if(response.data){
          $('#incomesId').click();
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
