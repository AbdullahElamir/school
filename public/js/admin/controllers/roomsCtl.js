(function(){
  'use strict';
  var app = angular.module('school');

  app.controller('RoomsCtl',['$scope','$state','RoomServ','toastr',function($scope,state,RoomServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;

   $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      RoomServ.getRoomsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.rooms = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
     };
     $scope.init("");
     
      $scope.getRoomsBySearchValue = function (searchValue){
        $scope.currentPage = 1;
        $scope.init(searchValue);
      };
   
   $scope.deleteRoom = function(id) {
    $scope.idRoom = id;
   };
   
   $scope.deleteConfirm = function(id) {
    RoomServ.deleteRoom(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
   
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          
          $scope.init($scope.searchValue);
          var count = $scope.rooms.filter(function(obj){return obj._id != id;}).length;
          if( $scope.currentPage > 1 && count == 0 ){
            $scope.currentPage -= 1;
            $scope.init($scope.searchValue);
          }
          
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }

    },function(response){
      console.log("Somthing went wrong");
    });
   }

  }]);

//editRoomCtl
  app.controller('editRoomCtl',['$scope','$stateParams','RoomServ','$state','toastr',function($scope,$stateParams,RoomServ,$state,toastr){
    $scope.editRoomForm={};
   
    RoomServ.getRoomById($stateParams).then(function(response) {
      $scope.editRoomForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });
    

    $scope.editRoom = function(){
  
      RoomServ.editRoom($stateParams.id,$scope.editRoomForm).then(function(response) {
        if(response.data){
          $state.go('rooms');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }

  }]);

  app.controller('newRoomCtl',['$scope','RoomServ','$state','toastr',function($scope,RoomServ,$state,toastr){
    
    $scope.newRoomForm={};
    $scope.newRoom = function(){
      RoomServ.addRoom($scope.newRoomForm).then(function(response){
        if(response.data){
          $state.go('rooms');
          toastr.success('تم الإضافة بنجاح');
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
        
    }

  }]);

}());