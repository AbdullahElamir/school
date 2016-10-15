(function(){
  'use strict';
  var app = angular.module('adminSchool');
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

   $scope.deleteYear = function(id) {
    $scope.idYear = id;
   };

   $scope.deleteConfirm = function(id) {
    YearServ.deleteYear(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){

          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');

          var count = $scope.years.length;
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

   $scope.activate = function(year){
     YearServ.activate(year._id,(year.active?0:1)).then(function(response){
       if(response){
         if(year.active === 0){
           for(var y in $scope.years){
             $scope.years[y].active = 0;
           }
           year.active = 1;
         }else{
           year.active = 0;
         }
       }else{
         toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
       }
     },function(response){
       console.log("Somthing went wrong");
     });
     };

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

  app.controller('newYearCtl',['$scope','YearServ','SystemServ','$state','toastr','AdminServ','SchoolServ',function($scope,YearServ,SystemServ,$state,toastr,AdminServ,SchoolServ){

    $scope.newYearForm={};
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
    $scope.newYear = function(){
      YearServ.addYear($scope.newYearForm).then(function(response){
        if(response.data){
          $('#yearsId').click();
          toastr.success('تم الإضافة بنجاح');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });

    };
    SystemServ.getAllSystem().then(function(response){
      $scope.allSystem = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

  }]);

}());
