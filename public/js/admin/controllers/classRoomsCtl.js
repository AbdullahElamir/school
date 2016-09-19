(function(){
  'use strict';
  var app = angular.module('adminSchool');

   app.controller('newClassRoomCtl',['$scope','$state','YearServ','RoomServ','ClassServ','ParentServ','toastr',function($scope,$state,YearServ,RoomServ,ClassServ,ParentServ,toastr){
    YearServ.getAllYears().then(function(response){
      $scope.allYears = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    ClassServ.getAllClasses().then(function(response){
      $scope.allClasses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    RoomServ.getAllRooms().then(function(response){
      $scope.allRooms = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.newClassRoomForm= {};
    $scope.newClassRooms = function(){
      console.log($scope.newClassRoomForm);


    }







   }]);

  app.controller('ClassRoomsCtl',['$scope','$stateParams','$state','ClassServ','YearServ',function($scope,$stateParams,$state,ClassServ,YearServ){
    YearServ.getAllYears().then(function(response){
      $scope.years = response.data;
      if($stateParams.year){
        $scope.year = $stateParams.year;
      }else{
        if($scope.years && $scope.years[0]){
          $scope.year = $scope.years[0]._id;
        }
      }
      $scope.refresh();
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.refresh = function(){
      ClassServ.getAllClassesByYear($scope.year).then(function(response){
        $scope.classes = response.data;
      },function(response){
        console.log("Somthing went wrong");
      });
    };
  }]);

  app.controller('ClassRoomStudentsCtl',['$scope','$stateParams','$state','StudentServ','ClassRoomsServ','ClassServ','toastr',function($scope,$stateParams,$state,StudentServ,ClassRoomsServ,ClassServ,toastr){
    $('body').off('click', '.list-group .list-group-item');
    $('body').on('click', '.list-group .list-group-item', function () {
      $(this).toggleClass('active');
    });
    $('body').off('click','.list-arrows button');

    $('body').on('click','.list-arrows button',function () {
      var $button = $(this), actives = '';
      if ($button.hasClass('move-left')) {
        actives = $('.list-right ul li.active');

        for(var fst=0;fst<actives.length;fst++){
          var found = false;
          var std = JSON.parse(actives.eq(fst).attr('x'));
          for(var st in $scope.students){
            if(std._id == $scope.students[st]._id){
              found = true;
            }
          }
          if(!found){
            actives.eq(fst).clone().appendTo('.list-left ul');
            $scope.students.push(std);
          }
        }
      } else if ($button.hasClass('move-right')) {
        actives = $('.list-left ul li.active');
        actives.remove();
        for(var fst=0;fst<actives.length;fst++){
          var std = JSON.parse(actives.eq(fst).attr('x'));
          var index = -1;
          for(var st in $scope.students){
            if($scope.students[st]._id == std._id){
              index = st;
            }
          }
          if(index != -1){
            $scope.students.splice(index,1);
          }
        }
      }
    });

    $('body').off('click','.dual-list .selector');
    $('body').on('click','.dual-list .selector',function () {
      var $checkBox = $(this);
      if (!$checkBox.hasClass('selected')) {
        $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
        $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
      } else {
        $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
        $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
      }
    });
    $('body').off('keyup','#input');
    $('body').on('keyup','#input',function (e) {
      var code = e.keyCode || e.which;
      if (code == '9') return;
      if (code == '27') $(this).val(null);
      var $rows = $(this).closest('.dual-list').find('.list-group li');
      var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
      $rows.show().filter(function () {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
      }).hide();
    });

    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.idd = $stateParams.year;
    $scope.allStudents = 1;
    $scope.filteredStudents = [];
    $scope.searchText = "";

    ClassRoomsServ.getStudents($stateParams.id,$stateParams.year).then(function(students){
      $scope.students=students.data;
      for(var st in $scope.students){
        $('.list-left ul').append("<li style='cursor: pointer;' x='"+JSON.stringify($scope.students[st])+"' class='list-group-item'>"+$scope.students[st].name+"</li>");
      }
    });

    $scope.save = function(){
      ClassRoomsServ.update($stateParams.id,$scope.students).then(function(response){
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $("#back").click();
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.reset = function(){
      $scope._class = "";
      $scope.filteredStudents = [];
    };
    $scope.getStudents = function(text){
      if($scope.allStudents == 1){
        StudentServ.getStudentsBySearchValue(text,50,1).then(function(response){
          $scope.filteredStudents=response.data.result;
        });
      }else{
        if($scope._class){
          StudentServ.getStudentsByLastYearClass(text,$scope._class).then(function(response){
            $scope.filteredStudents=response.data;
          });
        }
      }
    };
    $scope.getStudents("");

  }]);

  app.controller('ClassRoomAttendanceCtl',['$scope','$stateParams','$state','AttendanceServ',function($scope,$stateParams,$state,AttendanceServ){
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
      var date = data.date,mode = data.mode;
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

    $scope.year = $stateParams.year;
    $scope.date = new Date();

    $scope.setAttendance = function($event,StuPro,attend){
      var element = angular.element($event.currentTarget);
      if(!element.hasClass('active')){
        AttendanceServ.setStuProAttend(StuPro._id,attend).then(function(result){
          if(!result.data){
            toastr.error('عملية التعديل فشلت');
          }
        });
      }
    };

    $scope.refresh = function(){
      AttendanceServ.getStudentsByDateAndClassRoom($stateParams.id,$scope.date).then(function(students){
        $scope.students=students.data;
      });
    };
    $scope.refresh();

  }]);

}());
