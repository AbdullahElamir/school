(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('BusesCtl',['$scope','BusServ','toastr',function($scope,BusServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      BusServ.getBusesBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.buses = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.init("");
    $scope.getBusBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };
    $scope.deleteBus = function(id) {
      $scope.idBus = id;
    };

    $scope.deleteConfirm = function(id){
      BusServ.deleteBus(id).then(function(response){
        console.log(response.data);
        if(response.data.result == 1){
            toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
          } else if (response.data.result == 2){
            $('#myModal').modal('hide');
            toastr.success('تم الحذف بنجاح');
            var count = $scope.buses.length;
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
  app.controller('editBusCtl',['$scope','$stateParams','BusServ','toastr',function($scope,$stateParams,BusServ,toastr){

    $scope.editBusForm={};

    BusServ.getBusById($stateParams).then(function(response) {
    $scope.editBusForm = response.data;
    }, function(response){
      console.log("Something went wrong");
    });


    $scope.editBus = function(){
      BusServ.editBus($stateParams.id,$scope.editBusForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#busesId').click();
        } else {
          console.log(response.data);
        }
      }, function(response){
        console.log("Something went wrong");
      });
    };
  }]);


  app.controller('newBusCtl',['$scope','BusServ','toastr','AdminServ','SchoolServ',function($scope,BusServ,toastr,AdminServ,SchoolServ){

    $scope.newBusForm={};
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
    $scope.newBus = function(){
      BusServ.addBus($scope.newBusForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#busesId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
