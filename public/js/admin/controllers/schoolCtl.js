(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('SchoolsCtl',['$scope','SchoolServ','toastr',function($scope,SchoolServ,toastr){

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.schools=[];
    $scope.total=0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      SchoolServ.getSchoolsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.schools = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getSchoolsBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.preSchool = function(school) {
      $scope.idSchools = school._id;
      $scope.editSchoolsForm = angular.copy(school);
    };

    $scope.deleteConfirm = function(id) {
      SchoolServ.deleteSchool(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue);
          var count = $scope.schools.filter(function(obj){return obj._id != id;}).length;
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

    $scope.newSchool = function(){
      SchoolServ.addSchool($scope.newSchoolsForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $scope.newSchoolsForm = {name:"",description:"",school:""};
          $scope.getSchoolsBySearchValue($scope.searchValue);
          $('#newSchoolModal').modal('hide');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };


  }]);

  app.controller('EditSchoolCtl',['$scope','$state','toastr','SchoolServ',function($scope,$state,toastr,SchoolServ){
    $scope.school={};
    //get school info
    SchoolServ.getInfo().then(function(response){
      $scope.school.name=response.data.name;
      $scope.school.address=response.data.address;
      $scope.school.phone=response.data.phone;
      $scope.school.des=response.data.des;
    },function(err){
      console.log("Something went wrong");

    });

    $scope.editSchool = function(){

      SchoolServ.editSchool($scope.school).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $state.go('schools');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);


}());
