(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('RequiredFeesCtl',['$scope','RequiredFeesServ',function($scope,RequiredFeesServ){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.fees=[];
    $scope.init = function () {
      RequiredFeesServ.getRequiredFees($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.fees = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init();

  }]);
}());
