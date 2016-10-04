(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('system_settings',['$scope','$state','SystemServ','YearServ','toastr','RoomServ','TeacherServ','ClassRoomsServ',function($scope,state,SystemServ,YearServ,toastr,RoomServ,TeacherServ,ClassRoomsServ){
    $scope.addDataRow = function(index){                    
      var obj = { year:$scope.year._id , name:"" , room:"" , class:$scope.data.sys_class[index].id_class._id , sheft:"" };
      $scope.data.sys_class[index].classRooms.push(obj);
      var tsArray = [];
      for(var i in $scope.data.sys_class[index].selected){
        tsArray.push({ subject : { _id: $scope.data.sys_class[index].selected[i].id_subject._id , name : $scope.data.sys_class[index].selected[i].id_subject.name } , teacher:"" , year:$scope.year._id });
      }
      $scope.data.sys_class[index].ts.push(tsArray);
    };
    $scope.deleteDataRow = function(classIndex,classRoomIndex){
      if( $scope.data.sys_class[classIndex].classRooms.length > 1 ){
        $scope.data.sys_class[classIndex].classRooms.splice(classRoomIndex, 1);
        $scope.data.sys_class[classIndex].ts.splice(classRoomIndex, 1);
      }
    };
    YearServ.getAllYears().then(function(response){
      $scope.allYear = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });
    
    RoomServ.getAllRooms().then(function(response){
      $scope.allRooms = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });
    $scope.allShefts = [{ value : 1 , name : "الفترة الصباحية" },{ value : 2 , name : "الفترة المسائية" }];
    TeacherServ.getAllTeacher().then(function(response){
      $scope.allTeachers = response.data.result;
    }, function(response){
      console.log("Something went wrong");
    });
    
    $scope.refresh = function (){
      $scope.data = [];
      SystemServ.getClassesAndClassRoomsBySystem($scope.year.system,$scope.year._id).then(function(response){
        $scope.data = response.data;
        if ($scope.data.flag == 1){
          for(var i in $scope.data.sys_class){
            $scope.data.sys_class[i].classRooms = [];
            $scope.data.sys_class[i].ts = [];
            $scope.data.sys_class[i].fees = {amount : 0 , id_class:$scope.data.sys_class[i].id_class._id , year:$scope.year._id};
            $scope.addDataRow(i);
          }
        }
      },function(response){
        console.log("Somthing went wrong");
      });
      
    };
    
    $scope.openDialog = function(classIndex,calssRoomIndex){
      $scope.allSubjects = JSON.parse(JSON.stringify($scope.data.sys_class[classIndex].ts[calssRoomIndex]));
      $scope.classIndex = classIndex;
      $scope.calssRoomIndex = calssRoomIndex;
    };
    
    $scope.saveTeachersSubjects = function(){
      $scope.data.sys_class[$scope.classIndex].ts[$scope.calssRoomIndex] = JSON.parse(JSON.stringify($scope.allSubjects));
      $('#myModal').modal('hide');
    };
    
    $scope.save = function (){
      for(var i in $scope.data.sys_class){
        for(var j in $scope.data.sys_class[i].ts){
          for(var k in $scope.data.sys_class[i].ts[j]){
            if( $scope.data.sys_class[i].ts[j][k].teacher == "" ){
              toastr.error("يجب تحديد أستاذ مادة "+$scope.data.sys_class[i].ts[j][k].subject.name+" لـ "+$scope.data.sys_class[i].id_class.name+" في المجموعة "+$scope.data.sys_class[i].classRooms[j].name);
              return;
            }
          } 
        }
      }
      
      if($scope.data.flag == 1){
        SystemServ.addNewSystemSetting($scope.data).then(function(response) {
          if(response.data){
            $scope.data.flag = 2;
            toastr.success("تم الحفظ بنجاح");
            $("html, body").animate({ scrollTop: 0 }, "slow");
          } else {
            toastr.error('عملية الحفظ فشلت، حاول مرة أخرى !');
            $("html, body").animate({ scrollTop: 0 }, "slow");
          }
        }, function(response) {
          console.log("Something went wrong");
        });
      } else if($scope.data.flag == 2){
        SystemServ.editSystemSetting($scope.data).then(function(response) {
          if(response.data){
            toastr.info("تم التعديل بنجاح");
            $("html, body").animate({ scrollTop: 0 }, "slow");
          } else {
            toastr.error('عملية التعديل فشلت، حاول مرة أخرى !');
            $("html, body").animate({ scrollTop: 0 }, "slow");
          }
        }, function(response) {
          console.log("Something went wrong");
        });
      }
      
    };
    
  }]);
}());
