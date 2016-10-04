(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('StudentsEvaluateCtl',['$scope','$stateParams','StudentsEvaluateServ','toastr',function($scope,$stateParams,StudentsEvaluateServ,toastr){

    $scope.classRoom = $stateParams.id; //classRoom
    $scope.course = $stateParams.course;
    $scope.student = $stateParams.student;

    $scope.refresh = function(classRoom,course,month,half){
      if($scope.month && $scope.half){
        StudentsEvaluateServ.getRatings(classRoom,course,month,half).then(function(result){
          $scope.rateTypes = result.data;
        });
      }
    };

    $scope.submitRating = function(classRoom,course,month,half){
      StudentsEvaluateServ.setRatings(classRoom,course,month,half,$scope.rateTypes).then(function(result){
        if(result.data){
          toastr.success('تم الحفظ بنجاح');
          $('#cancel').click();
        }else{
          toastr.error('عملية الحفظ فشلت');
        }
      });

    };

  }]);

}());
