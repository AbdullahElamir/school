(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('teachersAttendanceCtl',['$scope','$state','AttendanceServ','toastr',function($scope,$state,AttendanceServ,toastr){
    $scope.date = new Date();
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.searchValue = "";

    $scope.setAttendance = function($event,teacher,attend){
      var element = angular.element($event.currentTarget);
      if(!element.hasClass('active')){
        AttendanceServ.setTeacherAttend(teacher._id,attend,$scope.date).then(function(result){
          if(!result.data){
            toastr.error('عملية التعديل فشلت');
          }else{
            teacher.attend = attend;
          }
        });
      }
    };

    $scope.reason = function(teacher){
      AttendanceServ.setTeacherReason(teacher,$scope.reasonVal,$scope.date).then(function(result){
        if(result.data){
          teacher.reason = $scope.reasonVal;
          toastr.success('تم اضافة السبب');
          $('#myModal').modal('hide');
        }else{
          toastr.error('عملية التعديل فشلت');
        }
      });
    };
    $scope.reasonPre = function(obj){
      $scope.reasonVal = "";
      $scope.idStudent = obj;
    };

    $scope.refresh = function(){
      AttendanceServ.getTeachersByDateAndSearchValue($scope.date,$scope.searchValue,$scope.pageSize,$scope.currentPage).then(function(response){
        $scope.teachers=response.data.result;
        $scope.total = response.data.count;
      });
    };
    $scope.refresh();

  }]);

  app.controller('adminsAttendanceCtl',['$scope','$state','AttendanceServ','toastr',function($scope,$state,AttendanceServ,toastr){
    $scope.date = new Date();
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.searchValue = "";

    $scope.setAttendance = function($event,admin,attend){
      var element = angular.element($event.currentTarget);
      if(!element.hasClass('active')){
        AttendanceServ.setAdminAttend(admin._id,attend,$scope.date).then(function(result){
          if(!result.data){
            toastr.error('عملية التعديل فشلت');
          }else{
            admin.attend = attend;
          }
        });
      }
    };

    $scope.reason = function(admin){
      AttendanceServ.setAdminReason(admin,$scope.reasonVal,$scope.date).then(function(result){
        if(result.data){
          admin.reason = $scope.reasonVal;
          toastr.success('تم اضافة السبب');
          $('#myModal').modal('hide');
        }else{
          toastr.error('عملية التعديل فشلت');
        }
      });
    };
    $scope.reasonPre = function(obj){
      $scope.reasonVal = "";
      $scope.idStudent = obj;
    };

    $scope.refresh = function(){
      AttendanceServ.getAdminsByDateAndSearchValue($scope.date,$scope.searchValue,$scope.pageSize,$scope.currentPage).then(function(response){
        $scope.admins=response.data.result;
        $scope.total = response.data.count;
      });
    };
    $scope.refresh();

  }]);


}());
