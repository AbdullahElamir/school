(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('VaccinationsCtl',['$scope','$state','$stateParams','VaccinationsServ','SchoolServ','toastr',function($scope,state,$stateParams,VaccinationsServ,SchoolServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.vaccinations=[];
    $scope.total=0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      VaccinationsServ.getVaccinationsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.vaccinations = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getVaccinationsBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.preVaccination = function(vaccination) {
      $scope.idVaccinations = vaccination._id;
      $scope.editVaccinationsForm = angular.copy(vaccination);
    };

    $scope.deleteConfirm = function(id) {
      VaccinationsServ.deleteVaccinations(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue);
          var count = $scope.vaccinations.filter(function(obj){return obj._id != id;}).length;
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

    $scope.editVaccination = function(){
      VaccinationsServ.editVaccinations($scope.idVaccinations,$scope.editVaccinationsForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $scope.getVaccinationsBySearchValue($scope.searchValue);
          $('#editVaccinationModal').modal('hide');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.newVaccination = function(){
      VaccinationsServ.addVaccinations($scope.newVaccinationsForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $scope.newVaccinationsForm = {name:"",description:""};
          $scope.getVaccinationsBySearchValue($scope.searchValue);
          $('#newVaccinationModal').modal('hide');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
