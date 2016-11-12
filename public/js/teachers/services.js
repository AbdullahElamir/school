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
        return $http.put('/student/message/'+idStudent,{message:message,type:"TEACHER"});
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
        return $http.put('/classRoom/message/'+idClassRoom,{message:message,type:"TEACHER"});
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

  app.service('TeacherServ',['$http',function($http){
    var self = {
      'getTeacherById': function(id) {
        return $http.get('/teacher/'+id.id);
      },
      'editTeacher': function(id,obj) {
        return $http.put('/teacher/edit/'+id,obj);
      },
      'changePass': function(userId,passwords){
        return $http.put('/teacher/changePass/'+userId,passwords);
      }
    };
    return self;
  }]);

  app.service('TasksServ',['$http',function($http){
    var self = {
      'addTasks': function(year){
        return $http.post('/tasks/add',year);
      },
      'getTasks': function(limit,page){
        return $http.get('/tasks/'+limit+'/'+page);
      },
      'getTasksBySearchValue': function(searchValue,limit,page,classRoom,subject){
        return $http.get('/tasks/'+searchValue+'/'+limit+'/'+page+'/'+classRoom+'/'+subject);
      },
      'deleteTasks': function(id){
        return $http.delete('/tasks/delete/'+id);
      },
      'getTasksById': function(id){
        return $http.get('/tasks/'+id.id);
      },
      'editTasks': function(id,obj){
        return $http.put('/tasks/edit/'+id,obj);
      },
      'getAllTasks': function(){
        return $http.get('/tasks/all');
      }
    };
    return self;
  }]);


  app.service('getStudentBySubjectServ',['$http',function($http){
    var self = {
      'getStudent': function() {
        return $http.get('/student');
      }
    };
     return self;
  }]);

  app.service('InboxServ',['$http',function($http){
    var self = {
      'getAllConversationsByTeacherID': function(){
        return $http.get('/conversation/conversations/teacher');
      },
      'getMessagesByConversationId': function(id){
        return $http.get('/conversation/conversation/messages/'+id);
      },
      'addMessageInConversation': function(id,message){
        return $http.post('/conversation/message/add/in/conversation/'+id,{message:message,type:"TEACHER"});
      },
      'setSeenAllMessagesInConversation': function(id){
        return $http.put('/conversation/message/seen/'+id,{type:"TEACHER"});
      }
    };
    return self;
  }]);

}());
