(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('SchoolCtl',['$scope','SchoolServ',function($scope,SchoolServ){
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
          $state.go('school');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);


}());