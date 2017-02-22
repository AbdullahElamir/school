(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('orderCtl',['$scope','$modal','OrderServ','StudentServ',function($scope,$modal,OrderServ,StudentServ){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.sendStatus=function(status){
      OrderServ.getAllOrder(status,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.students = response.data.result;
        console.log($scope.students);
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.sendStatus("SENDING");
    $scope.orderStatus = function(ff){
      OrderServ.changeStatus(ff).then(function(response){


      }, function(response){
        console.log("Something went wrong");
      });
    };

    $scope.viewStudent = function(id) {
      var result = id.filter(function( obj ) {
        return obj.status == 'SENDING';
      });
      $scope.Alldetails = result;   
      $scope.showModel=$modal({
        scope: $scope,
        templateUrl:'admin/pages/order/modelShow',
        show:true
        
      });
    };
    $scope.viewStudentPending = function(id) {
      var result = id.filter(function( obj ) {
        return obj.status == 'PENDING';
      });
      $scope.Alldetails = result;   
      $scope.showModel=$modal({
        scope: $scope,
        templateUrl:'admin/pages/order/modelShow',
        show:true
        
      });
    };
 }]);

}());


