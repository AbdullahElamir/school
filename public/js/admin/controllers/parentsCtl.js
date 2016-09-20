(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('newParenttCtl',['$scope','$state','ParentServ','toastr',function($scope,$state,ParentServ,toastr){
    
    $scope.newParentForm = {};
    $scope.newParent = function(){
      console.log($scope.newParentForm);
      ParentServ.addParent($scope.newParentForm).then(function(response){
         if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#ParentsId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }

      },function(response){
        console.log("Somthing went wrong");
      });

    };


    $scope.today = function() {
      $scope.newParentForm.birth_day = new Date();
      };
      $scope.today();
      $scope.clear = function() {
      $scope.newParentForm.birth_day = null;
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

app.controller('editParentCtl',['$scope','$state','ParentServ','toastr','$stateParams',function($scope,$state,ParentServ,toastr,$stateParams){
  $scope.editParentForm ={};
   
    ParentServ.getParentById($stateParams).then(function(response) {
      response.data.birth_day=new Date(response.data.birth_day);
        $scope.editParentForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });
    

     $scope.editParent = function(){
    
      ParentServ.editParent($stateParams.id,$scope.editParentForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#ParentsId').click();
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };



    $scope.today = function() {
      $scope.editParentForm.birth_day = new Date();
      };
      $scope.today();
      $scope.clear = function() {
      $scope.editParentForm.birth_day = null;
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

  //ParenttCtl
  app.controller('ParenttCtl',['$scope','$state','ParentServ','toastr',function($scope,state,ParentServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ParentServ.getParensBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.parents = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");
     
    $scope.getParentsBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };
   
    $scope.deleteParent = function(id) {
      $scope.idParent = id;
    };
    $scope.deleteConfirm = function(id) {
      ParentServ.deleteParent(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');  
          $scope.init($scope.searchValue);
          var count = $scope.parents.filter(function(obj){return obj._id != id;}).length;
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
    };
  
    $scope.openSendMessageDialog = function(id) {
      $scope.idParent = id;
    };
   
    $scope.sendMessageToParent = function() {      
      ParentServ.sendMessageToParent($scope.idParent,$scope.message).then(function(response){
        if(response.data === true){
          $scope.message.title = "";
          $scope.message.description = "";
          $('#messageModal').modal('hide');
          toastr.success('تم إرسال الرسالة بنجاح');
        }
      },function(response) {
        console.log("Somthing went wrong");
      });
    };

  }]);

}());