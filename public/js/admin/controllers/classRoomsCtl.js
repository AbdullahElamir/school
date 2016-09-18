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

}());