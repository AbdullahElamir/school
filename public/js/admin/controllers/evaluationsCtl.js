(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('EvaluationsCtl',['$scope','$state','EvaluationServ','toastr',function($scope,state,EvaluationServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      EvaluationServ.getEvaluationsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.evaluations = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.init("");
    $scope.getEvaluationsBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.deleteEvaluation = function(id) {
      $scope.idEvaluation = id;
    };
    $scope.deleteConfirm = function(id) {
      EvaluationServ.deleteEvaluation(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليه');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          var count = $scope.evaluations.length;
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

//editEvaluationCtl
  app.controller('editEvaluationCtl',['$scope','$stateParams','EvaluationServ','$state','toastr',function($scope,$stateParams,EvaluationServ,$state,toastr){
    $scope.editEvaluationForm={};

    EvaluationServ.getEvaluationById($stateParams).then(function(response) {
      console.log(response.data);
      $scope.editEvaluationForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });


    $scope.editEvaluation = function(){

      EvaluationServ.editEvaluation($stateParams.id,$scope.editEvaluationForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#EvaluationsId').click();
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  app.controller('newEvaluationCtl',['$scope','EvaluationServ','$state','toastr','AdminServ','SchoolServ',function($scope,EvaluationServ,$state,toastr,AdminServ,SchoolServ){
    $scope.newEvaluationForm={};
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
    $scope.newEvaluation = function(){
      EvaluationServ.addEvaluation($scope.newEvaluationForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#EvaluationsId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });

    };

  }]);

}());
