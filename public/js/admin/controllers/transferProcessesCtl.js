(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('transferProcessesCtl',['$scope','$state','YearServ','TransferProcessServ','toastr','BusServ','DriverServ','TeacherServ','StudentServ','ClassRoomsServ','ClassServ',function($scope,state,YearServ,TransferProcessServ,toastr,BusServ,DriverServ,TeacherServ,StudentServ,ClassRoomsServ,ClassServ){
      
    YearServ.getAllYears().then(function(response){
      $scope.getAllYears = response.data;
      $scope.getAllYears.splice(0,0,{_id:"all",name:"جميع السنوات الدراسية",system:"",active:0,status:1}); 
      $scope.year = "all";
    },function(response){
      console.log("Somthing went wrong");
    });
    
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue,year) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      if( year === 'undefined' || !year ){
        year = "all";
      }
      searchValue = encodeURIComponent(searchValue);
      TransferProcessServ.getTransferProcessesBySearchValueAndYear(searchValue,year,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.tps = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.init("","all");
    $scope.getTransferProcessesBySearchValueAndYear = function (searchValue,year){
      $scope.currentPage = 1;
      $scope.init(searchValue,year);
    };

    BusServ.getAllBuses().then(function(response){
      $scope.AllBuses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    DriverServ.getAllDrivers().then(function(response){
      $scope.AllDrivers = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    TeacherServ.getAllTeahers().then(function(response){
      $scope.AllSupervisors = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.addTransferProcessForm = {};
    $scope.addTransferProcess = function(){
      TransferProcessServ.addTransferProcess($scope.addTransferProcessForm).then(function(response) {
        if(response.data){
          toastr.success("تم الحفظ بنجاح");
          $scope.addTransferProcessForm = {};
          $('#myAddTPModal').modal('hide');
          $scope.init($scope.searchValue,$scope.year);
        } else {
          toastr.error('عملية الحفظ فشلت، حاول مرة أخرى !');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.editTP = function(tpo) {
      $scope.editTransferProcessForm = JSON.parse(JSON.stringify(tpo));
      $scope.editTransferProcessForm.driver = tpo.driver._id;
      $scope.editTransferProcessForm.bus = tpo.bus._id;
      $scope.editTransferProcessForm.supervisor = tpo.supervisor._id;
    };

    $scope.editTransferProcess = function(){
      TransferProcessServ.editTransferProcess($scope.editTransferProcessForm._id,$scope.editTransferProcessForm).then(function(response) {
        if(response.data){
          toastr.info("تم التعديل بنجاح");
          $scope.editTransferProcessForm = {};
          $('#myEditTPModal').modal('hide');
          $scope.init($scope.searchValue,$scope.year);
        } else {
          toastr.error('عملية الحفظ فشلت، حاول مرة أخرى !');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.deleteTP = function(id) {
      $scope.idTP = id;
    };
    $scope.deleteConfirm = function(id) {
      TransferProcessServ.deleteTransferProcess(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليه');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue,$scope.year);
          var count = $scope.tps.filter(function(obj){return obj._id != id;}).length;
          if( $scope.currentPage > 1 && count == 0 ){
            $scope.currentPage -= 1;
            $scope.init($scope.searchValue,$scope.year);
          }
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };
    
    
    
    
  }]);

}());