(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('NewAdminCtl',['$scope','$state','AdminServ','toastr',function($scope,$state,AdminServ,toastr){

    $scope.newAdminForm = {};
    $scope.newAdmin = function(){
      AdminServ.addAdmin($scope.newAdminForm).then(function(response){
         if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#AdminsId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }

      },function(response){
        console.log("Somthing went wrong");
      });

    };


    $scope.today = function() {
      $scope.newAdminForm.birth_day = new Date();
      };
      $scope.today();
      $scope.clear = function() {
      $scope.newAdminForm.birth_day = null;
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

//editStudentCtl

app.controller('EditAdminCtl',['$scope','$state','AdminServ','toastr','$stateParams',function($scope,$state,AdminServ,toastr,$stateParams){
  $scope.editAdminForm ={};

    AdminServ.getAdminById($stateParams).then(function(response) {
       response.data.birth_day=new Date(response.data.birth_day);
        $scope.editAdminForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });


     $scope.editAdmin = function(){

      AdminServ.editAdmin($stateParams.id,$scope.editAdminForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#AdminsId').click();
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };



    $scope.today = function() {
      $scope.editAdminForm.birth_day = new Date();
      };
      $scope.today();
      $scope.clear = function() {
      $scope.editAdminForm.birth_day = null;
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

  //AdminCtl

  app.controller('AdminsCtl',['$scope','$state','AdminServ','toastr',function($scope,state,AdminServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      AdminServ.getAdminsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.admins = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
     };
     $scope.init("");

      $scope.getAdminsBySearchValue = function (searchValue){
        $scope.currentPage = 1;
        $scope.init(searchValue);
      };

    $scope.deleteAdmin = function(id) {
    $scope.idAdmin = id;
   };
   $scope.deleteConfirm = function(id) {
    AdminServ.deleteAdmin(id).then(function(response){
      if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){

          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');

          $scope.init($scope.searchValue);
          var count = $scope.admins.filter(function(obj){return obj._id != id;}).length;
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

  }]);

}());
