(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('orderCtl',['$scope','$modal','OrderServ','StudentServ',function($scope,$modal,OrderServ,StudentServ){

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;

    // $scope.init = function (searchValue) {
    //   if( searchValue === 'undefined' || !searchValue ){
    //     searchValue = "";
    //   }
    //   searchValue = encodeURIComponent(searchValue);
    //   StudentServ.getStudentsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
    //     // $scope.students = response.data.result;
    //     console.log($scope.students);
    //     $scope.total = response.data.count;
    //   }, function(response){
    //     console.log("Something went wrong");
    //   });

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
      //  OrderServ.getNewOrder($scope.pageSize,$scope.currentPage).then(function(response) {
      //    $scope.students = response.data.result;
      //   console.log($scope.students);
      //   $scope.total = response.data.count;
      // }, function(response){
      //   console.log("Something went wrong");
      // });
     
    // $scope.init("");

    //   $scope.getStudentBySearchValue = function (searchValue){
    //   $scope.currentPage = 1;
    //   $scope.init(searchValue);
    // };

    //   OrderServ.newOrder().then(function(response) {
    //     OrderServ.getNewOrder().then(function(response1) {

    //       $scope.orders = response1.data;
    //       $scope.total = response1.data.count;
    //       console.log("mohammed ali");
      
    //     }, function(response1) {
    //     console.log("Something went wrong");
    //     });
    //   }, function(response) {
    //   console.log("Something went wrong");
    //   });

      $scope.viewStudent = function(id) {
        OrderServ.getOrderById(id).then(function(result){
          $scope.Alldetails = result.data;
          console.log(result.data);
        },function(result){
          console.log("Somthing went wrong !!");
        })

        // console.log(id);
        // $scope.idStudent = id.details;
         
        $scope.showModel=$modal({
          scope: $scope,
          templateUrl:'admin/pages/order/modelShow',
          show:true
          
        });
      };

    //   $scope.orderStatus = function(data){
    //   console.log(data);
    // };

 }]);

}());


