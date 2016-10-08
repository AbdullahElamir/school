(function() {
  'use strict';
    var app = angular.module('teachersSchool');
    app.service('studentsProcessesServ',['$http',function($http){
    var self = {
      'getStudentsInfo': function(){
        return $http.get('/studentsProcesses/stuPro');
      }
    };
    return self;
  }]);

  app.service('studentInformationServ',['$http',function($http){
    var self = {
      'getStudentsInfoBySubjectAndClassRoom': function(subjectId,classRoomId){
        return $http.get('/studentsProcesses/studInfo/'+subjectId+'/'+classRoomId);
      },
      'getExamsGradesByStudentBySubjectAndClassRoom': function(idStudent,subjectID,classRoomID){
        return $http.get('/studentsProcesses/grades/'+idStudent+'/'+subjectID+'/'+classRoomID);
      },
      'saveGradesOfStudent': function(idStudent,subjectID,classRoomID,examsGrades){
        return $http.put('/studentsProcesses/grades/edit/'+idStudent+'/'+subjectID+'/'+classRoomID,examsGrades);
      },
      'sendMessageToParentOfStudent': function(idStudent,message){
        return $http.put('/student/message/'+idStudent,message);
      }
    };
    return self;
  }]);

  app.service('ClassRoomServ',['$http',function($http){
    var self = {
      'getTeacherClassRooms': function(id){
        return $http.get('/classRoom/teacher/'+id);
      },
      'sendMessageToParentsOfClassRoom': function(idClassRoom,message){
        return $http.put('/classRoom/message/'+idClassRoom,message);
      }
    };
    return self;
  }]);

  app.service('StudentsEvaluateServ',['$http',function($http){
    var self = {
      'setRatings': function(student,course,month,half,ratings){
        return $http.put('/studentsProcesses/rate/'+student+'/'+course+'/'+month+'/'+half,ratings);
      },
      'getRatings': function(student,course,month,half){
        return $http.get('/studentsProcesses/rate/'+student+'/'+course+'/'+month+'/'+half);
      }
    };
    return self;
  }]);





}());
