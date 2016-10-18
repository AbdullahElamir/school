(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('DriversCtl',['$scope','DriverServ','toastr',function($scope,DriverServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      DriverServ.getDriversBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.drivers = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.init("");
    $scope.getDriverBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };
    $scope.deleteDriver = function(id) {
      $scope.idDriver = id;
    };

    $scope.deleteConfirm = function(id) {
      DriverServ.deleteDriver(id).then(function(response){
        if(response.data.result == 1){
            toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
          } else if (response.data.result == 2){
            $('#myModal').modal('hide');
            toastr.success('تم الحذف بنجاح');
            
            var count = $scope.drivers.length;
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

  //editDriverCtl
  app.controller('editDriverCtl',['$scope','$stateParams','DriverServ','$state','toastr',function($scope,$stateParams,DriverServ,$state,toastr){

    $scope.editDriverForm={};

    DriverServ.getDriverById($stateParams).then(function(response) {
      $scope.editDriverForm = response.data;
      }, function(response){
        console.log("Something went wrong");
      });


     $scope.editDriver = function(){
      DriverServ.editDriver($stateParams.id,$scope.editDriverForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#driversId').click();
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);


  app.controller('newDriverCtl',['$scope','DriverServ','toastr','AdminServ','SchoolServ',function($scope,DriverServ,toastr,AdminServ,SchoolServ){

    $scope.newDriverForm={};
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
    $scope.newDriver = function(){
      DriverServ.addDriver($scope.newDriverForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#driversId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
