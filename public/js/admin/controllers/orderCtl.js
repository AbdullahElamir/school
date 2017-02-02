(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('NewOrderCtl',['$scope','$modal','OrderServ','StudentServ',function($scope,$modal,OrderServ,StudentServ){

    $scope.total = 0;
    $scope.orders=[];

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

      $scope.viewStudent = function() {
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


