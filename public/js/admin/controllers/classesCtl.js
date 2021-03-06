(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('ClassesCtl',['$scope','$state','ClassServ','toastr',function($scope,state,ClassServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;

   $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ClassServ.getClassesBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.classes = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
     };
     $scope.init("");

      $scope.getClassesBySearchValue = function (searchValue){
        $scope.currentPage = 1;
        $scope.init(searchValue);
      };

   $scope.deleteClass = function(id) {
    $scope.idClass = id;
   };

   $scope.deleteConfirm = function(id) {
    ClassServ.deleteClass(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليه');
        } else if (response.data.result == 2){

          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');

          var count = $scope.classes.length;
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

//editClassCtl
  app.controller('editClassCtl',['$scope','$stateParams','ClassServ','$state','toastr',function($scope,$stateParams,ClassServ,$state,toastr){
    $scope.editClassForm={};
    $scope.allTypes = [
      {_id:1,name:"ابتدائي"},
      {_id:2,name:"اعدادي"},
      {_id:3,name:"ثانوي"}
    ];

    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
      $scope.getAllClasses.splice(0,0,{name:"لايوجد",_id:null});
    },function(response){
      console.log("Somthing went wrong");
    });

    ClassServ.getClassById($stateParams).then(function(response) {
      $scope.editClassForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });


    $scope.editClass = function(){

      ClassServ.editClass($stateParams.id,$scope.editClassForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#ClassesId').click();
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  app.controller('newClassCtl',['$scope','ClassServ','$state','toastr','AdminServ','SchoolServ',function($scope,ClassServ,$state,toastr,AdminServ,SchoolServ){

    $scope.newClassForm={};
    $scope.allTypes = [
      {_id:1,name:"ابتدائي"},
      {_id:2,name:"اعدادي"},
      {_id:3,name:"ثانوي"}
    ];

    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
      $scope.getAllClasses.splice(0,0,{name:"لايوجد",_id:null});
    },function(response){
      console.log("Somthing went wrong");
    });

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
    $scope.newClass = function(){
      ClassServ.addClass($scope.newClassForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#ClassesId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
