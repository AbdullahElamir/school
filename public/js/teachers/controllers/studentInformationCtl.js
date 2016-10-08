(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('StudentInformationCtl',['$scope','$stateParams','studentInformationServ','toastr',function($scope,$stateParams,studentInformationServ,toastr){
    $scope.studentinformtion={};
    //get student info by subject and class room
    
    $scope.subjectID = $stateParams.course;
    $scope.classRoomID = $stateParams.id;
    
    studentInformationServ.getStudentsInfoBySubjectAndClassRoom($scope.subjectID,$scope.classRoomID).then(function(response){
      $scope.studentinformtion=response.data;
    },function(err){
      console.log("Something went wrong");
    });
    
    function contains(a, obj) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
          return true;
        }
      }
      return false;
    }
    
    $scope.calculateAvg = function(semester) {
      var type2 = {};
      
      for(var i=0 ; i<$scope.examsGrades.length ; i++ ){
        if( $scope.examsGrades[i].semester == semester && $scope.examsGrades[i].type == 2 ){
          type2 = $scope.examsGrades[i];
        }
      }
      
      var sum = 0.0 , count=0;
      
      for(var i=0 ; i<$scope.examsGrades.length ; i++ ){
        if( $scope.examsGrades[i].semester == semester && $scope.examsGrades[i].type == 1 ){
          count++;
          sum += ($scope.examsGrades[i].studentMark/$scope.examsGrades[i].mark)*(type2.mark);
        }
      }
      
      for(var i=0 ; i<$scope.examsGrades.length ; i++ ){
        if( $scope.examsGrades[i].semester == semester && $scope.examsGrades[i].type == 2 ){
          $scope.examsGrades[i].studentMark = sum/count;
        }
      }
    };
    
    $scope.openGradesDialog = function(id) {
      $scope.idStudent = id;
      
      studentInformationServ.getExamsGradesByStudentBySubjectAndClassRoom($scope.idStudent,$scope.subjectID,$scope.classRoomID).then(function(response){
        $scope.examsGrades=response.data;
        
        var temp , semesters = [];
        
        //1 sort by semesters
        for(var i=0 ; i<$scope.examsGrades.length ; i++ ){
          for(var j=i+1 ; j<$scope.examsGrades.length; j++){
            if( $scope.examsGrades[i].semester > $scope.examsGrades[j].semester ){
              temp = $scope.examsGrades[i];
              $scope.examsGrades[i] = $scope.examsGrades[j];
              $scope.examsGrades[j] = temp;
            }
          }
        }

        //create semsters array
        for(var i=0 ; i<$scope.examsGrades.length ; i++ ){
          if( !contains(semesters,$scope.examsGrades[i].semester) ){
            semesters.push($scope.examsGrades[i].semester);
          }
        }

        //2 sort by type
        for(var s=0 ; s<semesters.length ; s++ ){
          for(var i=0 ; i<$scope.examsGrades.length ; i++ ){
            for(var j=i+1 ; j<$scope.examsGrades.length; j++){
              if( semesters[s] == $scope.examsGrades[i].semester && semesters[s] == $scope.examsGrades[j].semester && $scope.examsGrades[i].type > $scope.examsGrades[j].type ){
                temp = $scope.examsGrades[i];
                $scope.examsGrades[i] = $scope.examsGrades[j];
                $scope.examsGrades[j] = temp;
              }
            }
          }
        }

        for(var s=0 ; s<semesters.length ; s++ ){
          $scope.calculateAvg(semesters[s]);
        }
        
      },function(err){
        console.log("Something went wrong");
      });
      
    };
   
    $scope.saveGrades = function() {
      studentInformationServ.saveGradesOfStudent($scope.idStudent,$scope.subjectID,$scope.classRoomID,$scope.examsGrades).then(function(response){
        if(response.data === true){
          $scope.examsGrades = {};
          $('#gradesModal').modal('hide');
          toastr.success('تم الحفظ بنجاح');
        }
      },function(response) {
        console.log("Somthing went wrong");
      });
    };
    
    $scope.openSendMessageDialog = function(id) {
      $scope.idStudentMsg = id;
   };

    $scope.sendMessageToParentOfStudent = function() {
       studentInformationServ.sendMessageToParentOfStudent($scope.idStudentMsg,$scope.message).then(function(response){
         if(response.data === true){
           $scope.message.title = "";
           $scope.message.description = "";
           $('#messageModal').modal('hide');
           toastr.success('تم إرسال الرسالة بنجاح');
         }
       },function(response){
         console.log("Somthing went wrong");
       });
    };

  }]);

}());