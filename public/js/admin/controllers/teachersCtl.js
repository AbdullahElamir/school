(function(){
  'use strict';
  var app = angular.module('school');

  app.controller('TeachersCtl',['$scope','$state','TeacherServ','toastr',function($scope,state,TeacherServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
     TeacherServ.getTeachers($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.teachers = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
   }
   $scope.init();
   $scope.deleteTeacher = function(id) {
    $scope.idTeacher = id;
   }
   $scope.deleteConfirm = function(id) {
    TeacherServ.deleteTeacher(id).then(function(response){
      if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
   
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init();
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }

    },function(response){
      console.log("Somthing went wrong");
    });
   }

  }]);

//editTeacherCtl
  app.controller('editTeacherCtl',['$scope','$stateParams','TeacherServ','$state','toastr',function($scope,$stateParams,TeacherServ,$state,toastr){
    $scope.editTeacherForm={};
   
    TeacherServ.getTeacherById($stateParams).then(function(response) {
      response.data.birth_day = new Date(response.data.birth_day);
        $scope.editTeacherForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    

     $scope.editTeacher = function(){
    
      TeacherServ.editTeacher($stateParams.id,$scope.editTeacherForm).then(function(response) {
        if(response.data){
          $state.go('teachers');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    }



    $scope.today = function() {
      $scope.editTeacherForm.birth_day = new Date();
      };
      $scope.today();
      $scope.clear = function() {
      $scope.editTeacherForm.birth_day = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions = {
        /*dateDisabled: disabled,*/
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }
        return '';
      }  
  }]);

  app.controller('newTeacherCtl',['$scope','TeacherServ','$state','toastr',function($scope,TeacherServ,$state,toastr){
    
    $scope.newTeacherForm={};
    $scope.newTeacher = function(){
      TeacherServ.addTeacher($scope.newTeacherForm).then(function(response){
        if(response.data){
          $state.go('teachers');
          toastr.success('تم الإضافة بنجاح');
        } else {
          console.log($scope.newTeacherForm);
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
        
    }



      
      $scope.today = function() {
      $scope.newTeacherForm.birth_day = new Date();
      };
      $scope.today();
      $scope.clear = function() {
      $scope.newTeacherForm.birth_day = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions = {
        /*dateDisabled: disabled,*/
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }
        return '';
      }  
  }]);

}());