(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('OutcomesCtl',['$scope','$state','OutcomesServ','InOutcomeTypesServ','toastr',function($scope,state,OutcomesServ,InOutcomeTypesServ,toastr){
    $scope.startDate = $scope.finishDate = new Date();
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.outcomes=[];

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
        OutcomesServ.getOutcomesBySearchValue(2,$scope.cat,searchValue,$scope.startDate,$scope.finishDate,$scope.pageSize,$scope.currentPage).then(function(response) {
          $scope.outcomes = response.data.result;
          $scope.total = response.data.count;
        }, function(response) {
          console.log("Something went wrong");
        });
      }
    };
    $scope.init("");

    $scope.getOutcomesBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.deleteOutcome = function(id) {
      $scope.idOutcome = id;
    };

    $scope.deleteConfirm = function(id) {
      OutcomesServ.deleteOutcome(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          var count = $scope.outcomes.length;
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

  app.controller('editOutcomeCtl',['$scope','$stateParams','OutcomesServ','InOutcomeTypesServ','$state','toastr',function($scope,$stateParams,OutcomesServ,InOutcomeTypesServ,$state,toastr){

    $scope.editOutcomeForm={};
    OutcomesServ.getOutcomeById($stateParams).then(function(response) {
      $scope.editOutcomeForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    $scope.getAllTypes=[];
    InOutcomeTypesServ.getAllInOutcomeTypes().then(function(response) {
      $scope.getAllTypes = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editOutcome = function(){
      OutcomesServ.editOutcome($stateParams.id,$scope.editOutcomeForm).then(function(response) {
        if(response.data){
          $state.go('outcomes');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  app.controller('newOutcomeCtl',['$scope','OutcomesServ','InOutcomeTypesServ','$state','toastr','AdminServ','SchoolServ',function($scope,OutcomesServ,InOutcomeTypesServ,$state,toastr,AdminServ,SchoolServ){
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

    $scope.newOutcomeForm={};
    $scope.newOutcome = function(){
      $scope.newOutcomeForm.type = 2;
      OutcomesServ.addOutcome($scope.newOutcomeForm).then(function(response){
        if(response.data){
          $('#outcomesId').click();
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
